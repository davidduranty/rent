import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { VehicleDTO } from 'src/models/vehicle.model';
import { Vehicle } from '@entities/vehicle.entity';

@Injectable()
export class VehicleService {
    public constructor(
        @InjectRepository(Vehicle) private readonly _vehicleService: EntityRepository<VehicleDTO>
    ) { }

    public async getAll(): Promise<VehicleDTO[]> {
        const vehicles = await this._vehicleService.find(
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
}
