# Flux Complet de Réservation - Green Boat

## 📋 Vue d'ensemble
Le système de réservation fonctionne en 4 étapes principales avec validation, calcul de prix, envoi d'email et confirmation.

---

## 🔄 Flux Détaillé

### **ÉTAPE 1️⃣ : INFORMATIONS PERSONNELLES**

**Données collectées :**
- Nom complet du client
- Email (validation format email)
- Téléphone (format 06/07)

**Validation :**
```typescript
clientInfoSchema.parseAsync({
  name: string (requis),
  email: string (email valide requis),
  phone: string (requis)
})
```

**Fichier:** `client/src/components/ReservationModal.tsx` (lignes 234-270)

---

### **ÉTAPE 2️⃣ : DÉTAILS DU BATEAU**

**Données collectées :**
- Nom du bateau (optionnel)
- Catégorie : Voilier / Moteur / Autre
- Longueur en mètres (nombre)
- Surface en m² (nombre)
- Adresse du port/marina
- Quai (ex: Quai A)
- Emplacement (ex: Ponton 5)

**Validation :**
```typescript
boatInfoSchema.parseAsync({
  name: string,
  category: "voilier" | "moteur" | "autre" (requis),
  length: number (requis),
  surface: number (requis),
  portAddress: string (requis),
  quai: string (requis),
  emplacement: string (requis)
})
```

**Fichier:** `client/src/components/ReservationModal.tsx` (lignes 273-378)

---

### **ÉTAPE 3️⃣ : DATE ET HORAIRE**

**Données collectées :**
- Date de réservation (minimum demain)
- Créneau horaire disponible (sélection parmi les créneaux)

**Fonctionnement :**
1. Client sélectionne une date (min = demain)
2. Système récupère les créneaux disponibles via tRPC :
   ```typescript
   trpc.booking.getAvailableTimeSlots.useQuery({
     date: new Date(formData.reservationDate)
   })
   ```
3. Les créneaux générés automatiquement sont :
   - 08:00-10:00
   - 10:00-12:00
   - 14:00-16:00
   - 16:00-18:00

**Validation :**
```typescript
if (!formData.reservationDate) throw error
if (!formData.startTime || !formData.endTime) throw error
```

**Fichier:** `client/src/components/ReservationModal.tsx` (lignes 380-443)

---

### **ÉTAPE 4️⃣ : CONFIRMATION ET CRÉATION**

**Processus de création :**

1. **Validation complète** (ligne 161)
   ```typescript
   await bookingSchema.parseAsync(bookingData)
   ```

2. **Génération du numéro de devis** (ligne 44)
   ```typescript
   const quoteNumber = generateQuoteNumber()
   // Format: GB-2026-XXXXX (ex: GB-2026-68335)
   ```

3. **Calcul du prix total** (lignes 45-50)
   ```typescript
   const basePrice = 5000 (50€ en centimes)
   const totalPrice = calculateTotalPrice(
     basePrice,
     Math.round(input.boatLength * 10),
     Math.round(input.surface * 100)
   )
   // Formule: basePrice + (longueur × 50) + (surface × 10)
   ```

4. **Création en base de données** (lignes 52-72)
   ```typescript
   const reservation = await db.createReservation({
     quoteNumber,
     clientName, clientEmail, clientPhone,
     boatName, boatCategory, boatLength, surface,
     portAddress, quai, emplacement,
     reservationDate, startTime, endTime,
     basePrice, totalPrice,
     status: "pending",
     notes: ""
   })
   ```

5. **Envoi d'email de validation** (lignes 74-97)
   - Appel à `sendValidationEmail()` via Brevo
   - Email contient :
     - Numéro de devis
     - Tous les détails de la réservation
     - Lien de validation (expire 24h)
     - Informations de contact

6. **Notification au propriétaire** (lignes 102-112)
   - Appel à `notifyOwner()`
   - Titre: "Nouvelle réservation: GB-2026-XXXXX"
   - Contenu: Nom client + détails bateau

7. **Retour au client** (lignes 114-118)
   ```typescript
   return {
     success: true,
     quoteNumber: "GB-2026-XXXXX",
     totalPrice: 12500 (125€)
   }
   ```

8. **Affichage de la confirmation** (lignes 447-465)
   - Icône ✓ verte
   - Numéro de devis affiché
   - Montant total
   - Message: "Un email de confirmation a été envoyé à [email]"

---

## 📧 Système d'Email

### **Email de Validation (Brevo)**

**Envoyé à :** Email du client
**Sujet :** "Validez votre réservation - GB-2026-XXXXX"

**Contenu HTML :**
- En-tête avec logo Green Boat 🚤
- Bouton CTA bleu : "✓ Valider ma demande"
- Lien de validation : `https://greenboat.manus.space/validate-reservation?quote=GB-2026-XXXXX&token=`
- ⚠️ Alerte : "Ce lien expire dans 24 heures"
- Toutes les informations de la réservation
- Détails du bateau
- Prix total
- Contact: contact@greenboat.fr

**Fichier:** `server/email.ts` (lignes 265-310)

### **Configuration Brevo**

**Variables d'environnement requises :**
```
BREVO_API_KEY=xxxxx
BREVO_FROM_EMAIL=contact@greenboat.fr
```

**Endpoint API :** `https://api.brevo.com/v3/smtp/email`

---

## 💰 Calcul du Prix

**Formule :**
```
Prix Total = Prix de base + (Longueur bateau × 50) + (Surface × 10)

Exemple pour un bateau de 10m et 25m² :
- Prix de base: 50€
- Longueur: 10m × 50 = 500€
- Surface: 25m² × 10 = 250€
- TOTAL: 800€
```

**Fichier:** `shared/utils.ts` - fonction `calculateTotalPrice()`

---

## 🗄️ Structure Base de Données

### **Table `reservations`**

| Colonne | Type | Description |
|---------|------|-------------|
| id | INT | ID unique |
| quoteNumber | VARCHAR | Numéro de devis (GB-2026-XXXXX) |
| clientName | VARCHAR | Nom du client |
| clientEmail | VARCHAR | Email du client |
| clientPhone | VARCHAR | Téléphone du client |
| boatName | VARCHAR | Nom du bateau |
| boatCategory | ENUM | voilier / moteur / autre |
| boatLength | INT | Longueur en décimètres (10m = 100) |
| surface | INT | Surface en centièmes de m² (25m² = 2500) |
| portAddress | VARCHAR | Adresse du port |
| quai | VARCHAR | Numéro/nom du quai |
| emplacement | VARCHAR | Emplacement exact (ponton, etc) |
| zoneId | INT | Zone d'intervention |
| reservationDate | DATE | Date d'intervention |
| startTime | VARCHAR | Heure début (08:00) |
| endTime | VARCHAR | Heure fin (10:00) |
| basePrice | INT | Prix de base en centimes (5000 = 50€) |
| totalPrice | INT | Prix total en centimes |
| status | ENUM | pending / confirmed / completed / cancelled |
| notes | TEXT | Notes internes |
| createdAt | TIMESTAMP | Date création |
| updatedAt | TIMESTAMP | Date modification |

---

## 🔌 Procédures tRPC

### **1. `booking.create`**

**Input :**
```typescript
{
  clientName: string,
  clientEmail: string,
  clientPhone: string,
  boatName: string,
  boatCategory: "voilier" | "moteur" | "autre",
  boatLength: number,
  surface: number,
  portAddress: string,
  quai: string,
  emplacement: string,
  zoneId: number,
  reservationDate: Date,
  startTime: string,
  endTime: string
}
```

**Output :**
```typescript
{
  success: true,
  quoteNumber: "GB-2026-XXXXX",
  totalPrice: 12500
}
```

**Fichier:** `server/routers.ts` (lignes 37-119)

---

### **2. `booking.getAvailableTimeSlots`**

**Input :**
```typescript
{
  date: Date
}
```

**Output :**
```typescript
[
  {
    id: 1,
    startTime: "08:00",
    endTime: "10:00",
    available: true
  },
  ...
]
```

**Fichier:** `server/routers.ts` (lignes 27-35)

---

### **3. `booking.createPaymentSession`**

**Input :**
```typescript
{
  quoteNumber: string,
  totalPrice: number,
  clientEmail: string,
  clientName: string
}
```

**Output :**
```typescript
{
  checkoutUrl: "https://checkout.stripe.com/...",
  sessionId: "cs_live_..."
}
```

**Fichier:** `server/routers.ts` (lignes 127-170)

---

### **4. `booking.getByQuoteNumber`**

**Input :**
```typescript
{
  quoteNumber: string
}
```

**Output :**
```typescript
{
  id: 1,
  quoteNumber: "GB-2026-XXXXX",
  clientName: "Jean Dupont",
  ... (tous les détails)
}
```

**Fichier:** `server/routers.ts` (lignes 121-125)

---

## 🎯 Flux Complet Visuel

```
┌─────────────────────────────────────────────────────────────┐
│ CLIENT CLIQUE SUR "RÉSERVER"                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ MODAL RÉSERVATION S'OUVRE - ÉTAPE 1                        │
│ ✓ Nom, Email, Téléphone                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ VALIDATION ÉTAPE 1 ✓                                        │
│ Affiche ÉTAPE 2                                             │
│ ✓ Bateau, Catégorie, Longueur, Surface, Port, Quai        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ VALIDATION ÉTAPE 2 ✓                                        │
│ Affiche ÉTAPE 3                                             │
│ ✓ Date (min demain)                                         │
│ ✓ Récupère créneaux via tRPC.booking.getAvailableTimeSlots │
│ ✓ Sélection horaire                                         │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ CLIENT CLIQUE "CONFIRMER LA RÉSERVATION"                   │
│ ✓ Validation complète                                       │
│ ✓ Appel tRPC.booking.create()                              │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────────┐
        │ SERVEUR (Backend)          │
        │ ✓ Génère quoteNumber       │
        │ ✓ Calcule totalPrice       │
        │ ✓ Crée en DB               │
        │ ✓ Envoie email Brevo       │
        │ ✓ Notifie propriétaire     │
        └────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ ÉTAPE 4 - CONFIRMATION AFFICHÉE                            │
│ ✓ Icône verte                                               │
│ ✓ Numéro de devis: GB-2026-XXXXX                           │
│ ✓ Montant total: 125€                                       │
│ ✓ Message: "Email envoyé à [email]"                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ CLIENT REÇOIT EMAIL                                         │
│ ✓ Sujet: "Validez votre réservation - GB-2026-XXXXX"      │
│ ✓ Bouton: "✓ Valider ma demande"                          │
│ ✓ Lien: /validate-reservation?quote=GB-2026-XXXXX         │
│ ✓ Tous les détails de la réservation                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ PROPRIÉTAIRE REÇOIT NOTIFICATION                           │
│ ✓ Titre: "Nouvelle réservation: GB-2026-XXXXX"            │
│ ✓ Contenu: "Jean Dupont a réservé pour son bateau de 10m" │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ État de la Réservation

| État | Description | Transition |
|------|-------------|-----------|
| **pending** | En attente de validation email | → confirmed |
| **confirmed** | Email validé, en attente de paiement | → completed |
| **completed** | Paiement reçu, intervention programmée | - |
| **cancelled** | Annulée par client ou admin | - |

---

## 🔐 Sécurité

- ✅ Validation Zod sur tous les inputs
- ✅ Emails validés avant envoi
- ✅ Numéros de devis uniques et non séquentiels
- ✅ Lien de validation expire après 24h
- ✅ Stripe webhook pour sécuriser les paiements
- ✅ Authentification OAuth pour admin

---

## 📱 Pages Associées

- **Frontend Modal:** `client/src/components/ReservationModal.tsx`
- **Page Validation:** `client/src/pages/ValidateReservation.tsx`
- **Backend Routers:** `server/routers.ts`
- **Email Service:** `server/email.ts`
- **Database:** `server/db.ts`
- **Schémas:** `shared/schemas.ts`

