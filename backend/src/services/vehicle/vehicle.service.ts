import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { VehicleDTO } from 'src/models/vehicle.model';
import { Vehicle } from '@entities/vehicle.entity';

@Injectable()
export class VehicleService {
    public constructor(
        @InjectRepository(Vehicle) private readonly _vehicleRepository: EntityRepository<VehicleDTO>, private readonly _em: EntityManager,
    ) { }

    public async getAll(limit?: number): Promise<VehicleDTO[]> {
        const vehicles = await this._vehicleRepository.find(
            {},
            {
                strategy: LoadStrategy.SELECT_IN,
                offset: 0,
                orderBy: { id: QueryOrder.ASC },
                ...(limit ? { limit } : {})
            }
        );
        return vehicles;
    }

    async getById(id: number): Promise<VehicleDTO | null> {
        return this._vehicleRepository.findOne({ id });
    }

    async getVehicles(page: number, limit: number) {
        const [vehicle, totalCount] = await this._vehicleRepository.findAndCount(
            {},
            { offset: (page - 1) * limit, limit }
        );

        return {
            vehicle,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        };
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

    public async findAvailable(
        startDate: string,
        endDate: string,
        locationId: number,
        isProfessional: boolean
    ): Promise<VehicleDTO[]> {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            throw new Error('Dates invalides');
        }

        const whereClause = {
            available: true,
            ...(locationId && { location: locationId }),
            // ...(isProfessional && { isProfessional: true })
        };

        const vehicles = await this._vehicleRepository.find(whereClause, {
            strategy: LoadStrategy.SELECT_IN,
            orderBy: { id: QueryOrder.ASC }
        });

        return vehicles;
    }
}
