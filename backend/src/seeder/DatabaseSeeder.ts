import { Seeder } from "@mikro-orm/seeder";
import { EntityManager } from '@mikro-orm/core';
import { Vehicle } from "@entities/vehicle.entity";
import Data from "../../data/data-7.json"

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const firstElement: string = Data[0].image;
    const firstElementFromDB = em.findOne(Vehicle, { image: firstElement });
    if (!firstElementFromDB) {
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
    }
    // throw new Error("Method not implemented.");
  }

}
