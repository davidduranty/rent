import { Location } from '@entities/location.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { LocationDTO } from 'src/models/location.model';

@Injectable()
export class LocationService {
    public constructor(
        @InjectRepository(Location) private readonly _LocationRepository: EntityRepository<LocationDTO>,
        private readonly _em: EntityManager,
    ) { }



    public async getAll(): Promise<LocationDTO[]> {
        const location = await this._LocationRepository.find(
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
        const result = await this._LocationRepository.findOne(
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

    public async update(id: number, location: LocationDTO): Promise<LocationDTO> {
        const result = await this._LocationRepository.findOne({ id })

        if (!result) {
            throw new Error(`Aucun lieu trouvé avec l'ID "${id}".`);
        }

        result.name = location.name;
        result.address = location.address;
        result.city = location.city;
        result.zipCode = location.zipCode;
        result.publicHoliday = location.publicHoliday;
        result.vehicles = location.vehicles;
        await this._em.persistAndFlush(result);

        return result;
    }

    public async removeId(id: number): Promise<boolean> {
        const deleteId = await this._LocationRepository.nativeDelete({ id })

        return deleteId > 0;
    }
}
