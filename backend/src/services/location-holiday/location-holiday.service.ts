import { PublicHoliday } from '@entities/public-holiday.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { PublicHolidayDTO } from 'src/models/public-holiday.model';

@Injectable()
export class LocationHolidayService {
    public constructor(
        @InjectRepository(PublicHoliday) private readonly _locationHolidayService: EntityRepository<PublicHolidayDTO>
    ) { }
    public async getAll(): Promise<PublicHolidayDTO[]> {
        const locationHolidays = await this._locationHolidayService.find(
            {},
            {
                // populate: ['publicHoliday', 'vehicles'],
                // populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                // strategy: LoadStrategy.SELECT_IN,
                limit: 10,
                offset: 0,
                // orderBy: { id: QueryOrder.ASC }
            }
        )
        return locationHolidays
    }

    public async getById(id: number): Promise<PublicHolidayDTO> {
        const result = await this._locationHolidayService.findOne(
            { id: id },
        )
        if (!result) {
            throw new Error(`Aucun lieu trouvé avec l'id "${id}".`);
        }
        return {
            id: result.id,
            monday: result.monday,
            tuesday: result.tuesday,
            wednesday: result.wednesday,
            thursday: result.thursday,
            friday: result.friday,
            saturday: result.saturday,
            sunday: result.sunday
        }
    }
}
