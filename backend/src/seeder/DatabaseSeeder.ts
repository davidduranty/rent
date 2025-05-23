import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from '@mikro-orm/core';
import { Vehicle } from "@entities/vehicle.entity";
import Data from "../../data/data-vehicle.json";
import DataUser from "../../data/data-user.json";
import DataUtilities from "../../data/data-utility.json";
import DataLocation from "../../data/data-location.json";
import { Utilities } from "@entities/utilities.entity";
import { Location } from "@entities/location.entity";
import { PublicHoliday } from "@entities/public-holiday.entity";
import { User } from "@entities/user.entity";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    for (let k: number = 1; k < DataLocation.length; k++) {
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
      await em.persistAndFlush(publicHoliday);

      const location: Location = em.create(Location, {
        id: k,
        name: DataLocation[k].name,
        address: DataLocation[k].address,
        city: DataLocation[k].city,
        zipCode: DataLocation[k].zipCode,
        publicHoliday: publicHoliday,
      });
      await em.persistAndFlush(location);
    }

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
      await em.persistAndFlush(vehicle);
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
      await em.persistAndFlush(user);
    }

    for (const utilitiesData of DataUtilities) {
      const utilities = em.create(Utilities, {
        brand: utilitiesData.brand,
        model: utilitiesData.model,
        image: utilitiesData.image,
        weight: utilitiesData.weight,
        volume: utilitiesData.volume,
        isElectric: utilitiesData.isElectric,
      });
      await em.persistAndFlush(utilities);
    }

    const allLocations = await em.find(Location, {});

    const allVehicles = await em.find(Vehicle, {});

    for (const vehicle of allVehicles) {
        const randomLocation = allLocations[Math.floor(Math.random() * allLocations.length)];
        vehicle.location = randomLocation;
        em.persist(vehicle);
    }
    
    await em.flush();
  }
}
