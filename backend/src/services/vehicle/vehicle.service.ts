import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { VehicleDTO } from 'src/models/vehicle.model';
import { Vehicle } from '@entities/vehicle.entity';

@Injectable()
export class VehicleService {
    public constructor(
        @InjectRepository(Vehicle) private readonly _vehicleRepository: EntityRepository<VehicleDTO>
    ) { }

    public async getAll(): Promise<VehicleDTO[]> {
        const vehicles = await this._vehicleRepository.find(
            {},
            {
                // populate: ['publicHoliday', 'vehicles'],
                // populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                limit: 10,
                offset: 0,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        return vehicles
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
            ...(isProfessional && { isProfessional: true })
        };

        const vehicles = await this._vehicleRepository.find(whereClause, {
            strategy: LoadStrategy.SELECT_IN,
            orderBy: { id: QueryOrder.ASC }
        });

        return vehicles;
    }
}
