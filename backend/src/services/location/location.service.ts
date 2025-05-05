import { Location } from '@entities/location.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
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
                populate: ['publicHoliday', 'vehicles'],
                populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                limit: 10,
                offset: 0,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        return location
    }

    public async getByName(name: string): Promise<LocationDTO> {
        const result = await this._LocationService.findOne(
            { name: { $ilike: name } },
            {
                populate: ['publicHoliday', 'vehicles'],
                populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        console.log("Résultat trouvé :", result);
        if (!result) {
            throw new Error(`Aucun lieu trouvé avec le nom "${name}".`);
        }
        return {
            id: result.id,
            name: result.name,
            address: result.address,
            city: result.city,
            zipCode: result.zipCode,
            publicHoliday: result.publicHoliday,
            vehicles: result.vehicles
        } as LocationDTO;
    }
}
