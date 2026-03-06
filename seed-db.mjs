import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

async function seedDatabase() {
  const connection = await mysql.createConnection(DATABASE_URL);

  try {
    console.log("Seeding zones...");

    // Insérer les zones
    const zones = [
      {
        name: "Zone Côte d'Azur",
        description: "Services disponibles sur la Côte d'Azur",
        basePrice: 5000, // 50€
      },
      {
        name: "Zone Provence",
        description: "Services disponibles en Provence",
        basePrice: 4500, // 45€
      },
      {
        name: "Zone Bretagne",
        description: "Services disponibles en Bretagne",
        basePrice: 5500, // 55€
      },
    ];

    for (const zone of zones) {
      await connection.execute(
        "INSERT INTO zones (name, description, basePrice) VALUES (?, ?, ?)",
        [zone.name, zone.description, zone.basePrice]
      );
    }

    console.log("Zones inserted successfully");

    // Récupérer les IDs des zones
    const [zoneRows] = await connection.execute("SELECT id FROM zones");
    const zoneIds = zoneRows.map((row) => row.id);

    console.log("Seeding time slots...");

    // Créneaux horaires standards pour chaque zone
    // Lundi à vendredi (1-5), 2 créneaux par jour
    const timeSlots = [
      { startTime: "08:00", endTime: "12:00", maxReservations: 3 },
      { startTime: "14:00", endTime: "18:00", maxReservations: 3 },
    ];

    for (const zoneId of zoneIds) {
      // Lundi à vendredi
      for (let dayOfWeek = 1; dayOfWeek <= 5; dayOfWeek++) {
        for (const slot of timeSlots) {
          await connection.execute(
            "INSERT INTO availableTimeSlots (zoneId, dayOfWeek, startTime, endTime, maxReservations) VALUES (?, ?, ?, ?, ?)",
            [zoneId, dayOfWeek, slot.startTime, slot.endTime, slot.maxReservations]
          );
        }
      }

      // Samedi (6): 1 créneau
      await connection.execute(
        "INSERT INTO availableTimeSlots (zoneId, dayOfWeek, startTime, endTime, maxReservations) VALUES (?, ?, ?, ?, ?)",
        [zoneId, 6, "09:00", "13:00", 2]
      );
    }

    console.log("Time slots inserted successfully");
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

seedDatabase();
