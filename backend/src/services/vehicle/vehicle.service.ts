import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, LoadStrategy, QueryOrder, t } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { VehicleDTO } from 'src/models/vehicle.model';
import { Vehicle } from '@entities/vehicle.entity';

@Injectable()
export class VehicleService {
    public constructor(
        @InjectRepository(Vehicle) private readonly _vehicleRepository: EntityRepository<VehicleDTO>, private readonly _em: EntityManager,
    ) { }

    public async getAll(): Promise<VehicleDTO[]> {
        const vehicles = await this._vehicleRepository.find(
            {},
            {
                // populate: ['publicHoliday', 'vehicles'],
                // populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                limit: 50,
                offset: 0,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        return vehicles
    }

    public async update(id: number, vehicle: Vehicle): Promise<VehicleDTO> {
        const result = await this._vehicleRepository.findOne({ id })

        if (!result) {
            throw new Error(`Aucun véhicule trouvé avec l'ID "${id}".`);
        }

        result.brand = vehicle.brand;
        result.model = vehicle.model;
        result.image = vehicle.image;
        result.transmition = vehicle.transmition;
        result.place = vehicle.place;
        result.available = vehicle.available;
        result.type = vehicle.type;
        await this._em.persistAndFlush(result);

        return result;
    }

    public async addVehicle(vehicle: VehicleDTO): Promise<VehicleDTO | null> {
        try {
            const existingVehicle = await this._vehicleRepository.findOne({ brand: vehicle.brand, model: vehicle.model });
            if (existingVehicle) {
                throw new Error(`Le véhicule ${vehicle.brand} ${vehicle.model} existe déjà.`);
            }

            const newVehicle = this._vehicleRepository.create(vehicle)
            await this._em.persistAndFlush(newVehicle);
            return newVehicle;
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout du véhicule : ${error.message}`);
        }
    }

    public async removeId(id: number): Promise<boolean> {
        const deleteId = await this._vehicleRepository.nativeDelete({ id });
        return deleteId > 0
    }
}
