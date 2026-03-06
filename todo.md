# Green Boat - TODO

## Architecture & Base de Données
- [x] Définir le schéma de base de données (réservations, zones, créneaux horaires)
- [x] Créer les tables: reservations, availableTimeSlots, zones
- [x] Implémenter les migrations Drizzle

## Formulaire de Réservation Multi-étapes
- [x] Étape 1: Informations client (nom, email, téléphone)
- [x] Étape 2: Détails du bateau (longueur, surface, adresse port, emplacement)
- [x] Étape 3: Sélection de zone et date
- [x] Étape 4: Sélection d'horaire disponible
- [x] Étape 5: Récapitulatif et confirmation
- [x] Validation Zod pour tous les champs
- [x] Validation téléphone français (06/07)
- [x] Gestion des états et navigation entre étapes

## Logique Métier
- [x] Calcul des créneaux horaires disponibles par zone
- [x] Génération automatique de numéros de devis (GB-YYYY-XXXXX)
- [x] Calcul du prix basé sur la longueur et surface du bateau
- [x] Enregistrement de la réservation en base de données

## Emails et Notifications
- [x] Configuration du service d'email
- [x] Template d'email de confirmation client
- [x] Envoi d'email avec numéro de devis et détails
- [x] Notification au propriétaire pour chaque nouvelle réservation

## Interface de Gestion des Réservations
- [x] Dashboard avec liste des réservations
- [x] Recherche par client, date, zone
- [x] Filtrage par statut (en attente, confirmée, completée, annulée)
- [x] Affichage des détails complets de chaque réservation
- [ ] Export des données

## Interface Utilisateur
- [x] Design responsive pour mobile et tablette
- [x] Thème professionnel et fonctionnel
- [x] Messages d'erreur clairs
- [x] Feedback utilisateur (loading, success, error states)
- [x] Accessibilité (contraste, navigation au clavier)

## Tests et Validation
- [x] Tests unitaires pour les procédures tRPC
- [x] Tests de validation Zod
- [x] Tests du calcul des créneaux horaires
- [x] Tests de génération de devis

## Déploiement
- [x] Vérifier la compilation du projet
- [x] Tester tous les flux utilisateur
- [x] Créer checkpoint final

## Corrections (Session 5)
- [x] Identifier et corriger la colonne orpheline boatLocation
- [x] Supprimer la colonne boatLocation de la base de données
- [x] Tester l'insertion manuelle avec succès
- [x] Vérifier que le formulaire fonctionne correctement

## Statut Final
- [x] Application complètement fonctionnelle
- [x] Tous les tests passent (7/7)
- [x] Formulaire de réservation en 3 étapes
- [x] Popups de calendrier et d'horaires
- [x] Insertion en base de données
- [x] Génération de devis
- [x] Emails de confirmation
- [x] Dashboard d'administration


## Modifications Demandées (Session 2)
- [x] Ajouter champ "Catégorie du bateau" (Voilier, Moteur, Autre)
- [x] Ajouter champs séparés "Quai" et "Emplacement" au lieu d'un seul champ
- [x] Supprimer l'étape 3 (Zone et Date) et fusionner avec l'étape 4
- [x] Créer popup calendrier pour sélection de date d'intervention
- [x] Créer popup d'horaires avec gestion des réservations existantes
- [x] Afficher les créneaux déjà réservés dans le calendrier/horaires
- [x] Mettre à jour les schémas Zod pour les nouvelles validations
- [x] Mettre à jour la base de données pour la catégorie de bateau


## Modifications Demandées (Session 3)
- [x] Supprimer la sélection de zone de service du formulaire
- [x] Créer une popup d'horaires intelligente avec gestion des 2 heures d'intervention
- [x] Calculer les créneaux disponibles en fonction des réservations existantes
- [x] Afficher les horaires avec blocage de 2 heures par réservation
- [x] Mettre à jour le template d'email avec toutes les informations du formulaire
- [x] Ajouter les informations personnelles du client dans l'email
- [x] Afficher la durée d'intervention (2 heures) dans l'email


## Corrections (Session 4)
- [x] Corriger les validations Zod (regex téléphone, longueurs minimales)
- [x] Assouplir les règles de validation pour meilleure UX
- [x] Tester les validations avec les données du formulaire


## Nouvelles Fonctionnalités (Session 6)
- [x] Intégrer SendGrid pour envoyer les vrais emails
- [x] Créer la page Services avec présentation du service
- [x] Créer la page Contact avec formulaire
- [x] Intégrer Stripe pour le paiement en ligne
- [x] Ajouter les routes Services et Contact à App.tsx
- [x] Tester la navigation complète


## Configuration Brevo (Session 7)
- [x] Obtenir la clu00e9 API Brevo
- [x] Obtenir l'adresse email d'envoi
- [x] Configurer les variables d'environnement Brevo
- [x] Mettre à jour le code pour utiliser Brevo
- [x] Tester l'envoi d'emails


## Témoignages Clients (Session 8)
- [x] Créer un composant de témoignages avec photos
- [x] Ajouter la section de témoignages à la page d'accueil
- [x] Générer des photos de bateaux nettoyés
- [x] Tester et valider l'affichage


## SEO Local Nouvelle-Aquitaine (Session 9)
- [x] Créer la stratégie SEO locale et les 20 mots-clés prioritaires
- [x] Créer les pages ville (Arcachon, Hossegor, Saint-Jean-de-Luz)
- [x] Rédiger l'article blog SEO
- [x] Implémenter les schémas JSON-LD et LocalBusiness
- [x] Ajouter le footer avec mentions légales
- [x] Optimiser les balises alt des images
- [x] Tester et valider l'implémentation


## Restructuration Landing Page (Session 10)
- [x] Restructurer Home.tsx en landing page scrollable
- [x] Intégrer la section À propos
- [x] Intégrer la section Services
- [x] Intégrer la section Contact avec formulaire
- [x] Intégrer la section Réserver maintenant
- [x] Mettre à jour la navigation pour les ancres (#about, #services, #contact, #booking)
- [x] Supprimer les pages séparées (Booking, Services, Contact)
- [x] Tester le scroll et les interactions


## Correction Réservation (Session 11)
- [x] Créer un composant ReservationModal avec étapes
- [x] Intégrer le formulaire de réservation dans le modal
- [x] Ajouter la confirmation avec numéro de devis
- [x] Intégrer le modal dans la section Réserver
- [x] Tester le flux complet de réservation


## Intégration Email de Confirmation (Session 12)
- [x] Configurer Brevo API pour l'envoi d'emails
- [x] Créer la procédure tRPC d'envoi d'email de confirmation
- [x] Ajouter le template d'email avec tous les détails
- [x] Générer un token de validation unique
- [x] Créer la page de validation de réservation
- [x] Ajouter la route de validation
- [x] Tester l'envoi et la validation d'email


## Restructuration Design PDF (Session 13)
- [x] Analyser le PDF et documenter la charte graphique
- [x] Mettre à jour la palette de couleurs CSS
- [x] Générer/créer les images et icônes
- [x] Restructurer la page d'accueil avec les sections du PDF
- [x] Ajouter la section tarification
- [x] Ajouter la section contact
- [x] Intégrer le modal de réservation
- [x] Tester le design et les fonctionnalités


## Intégration Gemini pour Emails (Session 14)
- [x] Configurer la clé API Gemini
- [x] Créer les fonctions de génération d'email avec Gemini
- [x] Intégrer Gemini dans le flux de réservation
- [x] Tester et valider la génération d'emails


## Calcul Automatique de Superficie (Session 15)
- [x] Ajouter le champ largeur dans le formulaire de réservation
- [x] Créer la formule de calcul de superficie (largeur × longueur)
- [x] Ajouter le calcul du devis (15€ par m²)
- [x] Afficher l'estimation en temps réel dans le formulaire
- [x] Mettre à jour la formule de calcul du prix dans shared/utils.ts
- [x] Tester les calculs et valider les résultats


## Recherche Automatique des Données Techniques (Session 15 - Partie 2)
- [x] Mettre à jour le schéma de base de données avec marque, modèle, longueur à la flottaison, tirant d'eau
- [x] Ajouter les champs marque et modèle au formulaire de réservation
- [x] Ajouter les champs longueur à la flottaison et tirant d'eau au formulaire
- [x] Intégrer Gemini pour rechercher les données techniques du bateau
- [x] Implémenter le calcul automatique de la superficie immergée (longueur flottaison × tirant d'eau)
- [x] Afficher l'estimation du devis en temps réel (15€/m²)
- [x] Tester et valider le flux complet


## Simplification du Formulaire (Session 17)
- [x] Supprimer le bouton "Calculer" et l'appel Gemini
- [x] Garder les champs marque et modèle pour vérification
- [x] Afficher les champs pour entrée manuelle (longueur flottaison, tirant d'eau)
- [x] Calculer automatiquement la surface immergée en temps réel
- [x] Afficher l'estimation du devis en temps réel
- [x] Tester le flux simplifié


## Amelioration de la Validation des Formulaires (Session 18)
- [x] Ameliorer les messages d'erreur de validation
- [x] Afficher les erreurs dans une pop-up/toast claire
- [x] Tester la validation avec champs vides
- [x] Tester la validation avec emails invalides
- [ ] Corriger Brevo avec domaine Manus


## Formule Affinee de Calcul de Superficie (Session 19)
- [x] Mettre a jour la formule: LWL × Tirant d'eau × (Largeur totale / Longueur hors tout)
- [x] Tester avec differents cas de bateaux
- [x] Valider que le devis est correct (15€/m²)


## Intégration Base de Données de Bateaux (Session 20)
- [x] Créer la table boat_models avec marque, modèle, LOA, Beam, Draft, Surface
- [x] Importer les données du CSV dans la base de données
- [x] Ajouter une procédure tRPC pour rechercher un bateau par marque + modèle
- [x] Modifier le formulaire pour pré-remplir la superficie et le devis
- [x] Tester avec les bateaux de la base de données


## Simplification du Flux de Sélection Bateau (Session 21)
- [x] Ajouter procédure tRPC pour récupérer les modèles par marque
- [x] Modifier le formulaire avec sélection marque et liste déroulante modèle
- [x] Implémenter le pré-remplissage automatique à la sélection du modèle
- [x] Supprimer le bouton "Calculer" et simplifier l'interface
- [x] Tester le flux complet marque → modèle → pré-remplissage automatique
