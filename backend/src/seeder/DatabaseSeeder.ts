import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from '@mikro-orm/core';
import { Vehicle } from "@entities/vehicle.entity";
import Data from "../../data/data-7.json";
import DataUser from "../../data/data-user.json";
import DataUtilities from "../../data/data-utility.json";
import DataLocation from "../../data/data-location.json";
import { Utilities } from "@entities/utilities.entity";
import { Location } from "@entities/location.entity";
import { PublicHoliday } from "@entities/public-holiday.entity";
import { User } from "@entities/user.entity";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // Persiste les public holidays et locations
    for (let k = 0; k < DataLocation.length; k++) {
      const publicHoliday = em.create(PublicHoliday, {
        id: k,
        monday: "ouvert",
        tuesday: "ouvert",
        wednesday: "ouvert",
        thursday: "fermé",
        friday: "ouvert",
        saturday: "ouvert",
        sunday: "fermé",
      });
      await em.persistAndFlush(publicHoliday); // Assure que publicHoliday est persisté

      const location = em.create(Location, {
        id: k,
        name: DataLocation[k].name,
        address: DataLocation[k].address,
        city: DataLocation[k].city,
        zipCode: DataLocation[k].zipCode,
        publicHoliday: publicHoliday, // Passe l'instance correcte
      });
      await em.persistAndFlush(location); // Persiste chaque location
    }

    // Persiste les véhicules
    for (const vehicleData of Data) {
      const vehicle = em.create(Vehicle, {
        brand: vehicleData.brand,
        model: vehicleData.model,
        image: vehicleData.image,
        transmition: vehicleData.transmition,
        place: 5,
        available: true,
        type: vehicleData.type,
      });
      await em.persistAndFlush(vehicle); // Persiste chaque véhicule
    }

    for (const UsersData of DataUser) {
      const user = em.create(User, {
        name: UsersData.name,
        surname: UsersData.surname,
        birthday: UsersData.birthday,
        email: UsersData.email,
        isAdmin: false,
        professionnal: false,
        password: "0000"
      });
      await em.persistAndFlush(user); // Persiste chaque user
    }

    // Persiste les utilities
    for (const utilitiesData of DataUtilities) {
      const utilities = em.create(Utilities, {
        brand: utilitiesData.brand,
        model: utilitiesData.model,
        image: utilitiesData.image,
        weight: utilitiesData.weight,
        volume: utilitiesData.volume,
        isElectric: utilitiesData.isElectric,
      });
      await em.persistAndFlush(utilities); // Persiste chaque utility
    }

    // Associe les véhicules à des locations
    for (let i = 1; i <= 10; i++) {
      const currentVehicle = await em.findOne(Vehicle, { id: i });
      if (!currentVehicle) {
        console.error(`Véhicule avec l'id ${i} non trouvé`);
        continue; // Passe au suivant si le véhicule est introuvable
      }

      const assignedLocation = await em.findOne(Location, { id: i % DataLocation.length });
      if (!assignedLocation) {
        console.error(`Location pour le véhicule avec l'id ${i} introuvable`);
        continue;
      }

      currentVehicle.location = assignedLocation; // Associe la bonne instance de Location
      await em.persistAndFlush(currentVehicle);
    }
  }
}
