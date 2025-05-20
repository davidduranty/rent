import { Location } from '@entities/location.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { LocationDTO } from 'src/models/location.model';

@Injectable()
export class LocationService {
    public constructor(
        @InjectRepository(Location) private readonly _locationRepository: EntityRepository<LocationDTO>,
        private readonly _em: EntityManager,
    ) { }



    public async getAll(): Promise<LocationDTO[]> {
        const location = await this._locationRepository.find(
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

    public async getById(id: number): Promise<LocationDTO> {
        const result = await this._locationRepository.findOne(
            { id: id },
            {
                populate: ['publicHoliday', 'vehicles'],
                populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
                strategy: LoadStrategy.SELECT_IN,
                orderBy: { id: QueryOrder.ASC }
            }
        )
        if (!result) {
            throw new Error(`Aucun lieu trouvé avec l'ID "${id}".`);
        }
        return result
    }

    public async getByName(name: string): Promise<LocationDTO> {
        const result = await this._locationRepository.findOne(
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

    public async update(id: number, location: Location): Promise<LocationDTO> {
        const result = await this._locationRepository.findOne({ id })

        if (!result) {
            throw new Error(`Aucun lieu trouvé avec l'ID "${id}".`);
        }

        result.name = location.name;
        result.address = location.address;
        result.city = location.city;
        result.zipCode = location.zipCode;
        await this._em.persistAndFlush(result);

        return result;
    }

    public async addLocation(location: LocationDTO): Promise<LocationDTO | null> {
        try {
            const existingLocation = await this._locationRepository.findOne({ name: location.name });
            if (existingLocation) {
                throw new Error(`Le nom ${location.name} est déjà utilisé.`);
            }

            const newLocation = this._locationRepository.create({
                name: location.name,
                address: location.address,
                city: location.city,
                zipCode: location.zipCode,
                publicHoliday: location.publicHoliday,
                vehicles: location.vehicles,
                hour: 0
            })

            await this._em.persistAndFlush(newLocation);
            return newLocation;
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout du lieu : ${error}`);
        }
    }

    public async removeId(id: number): Promise<boolean> {
        const deleteId = await this._locationRepository.nativeDelete({ id })

        return deleteId > 0;
    }
}
