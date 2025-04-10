import { Location } from '@entities/location.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/postgresql';
import { Inject, Injectable } from '@nestjs/common';
import { LocationDTO } from 'src/models/location.model';

@Injectable()
export class LocationService {
    public constructor(
        @InjectRepository(Location) private readonly _LocationService: EntityRepository<LocationDTO>

    ) { }



    public async getAll(): Promise<LocationDTO[]> {
        const location = await this._LocationService.find(
            {},
            {
                populate: ['publicHoliday'],
                populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                limit: 10,
                offset: 0,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        return location
    }

}
