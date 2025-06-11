import { Injectable } from '@nestjs/common';

import { from, Observable, of } from 'rxjs';
import { ProDto } from 'src/models/professionnal.model';
import { Professionnal } from '@entities/professionnal.entity';
import { EntityRepository, EntityManager, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';


@Injectable()
export class ProfessionnalService {


    public constructor(
        @InjectRepository(Professionnal) private readonly _proRepository: EntityRepository<ProDto>,
        private readonly _em: EntityManager,

    ) { }


    // public async getAllPro(): Promise<ProDto[]> {
    //     const professionnal = await this._userRepository.find(
    //         {},
    //         {
    //             // populate: ['publicHoliday', 'vehicles'],
    //             // populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
    //             strategy: LoadStrategy.SELECT_IN,
    //             limit: 10,
    //             offset: 0,
    //             orderBy: { id: QueryOrder.ASC }
    //         }
    //     )
    //     return professionnal
    // }

    public getAllPro(): Observable<ProDto[]> {
        return from(this._proRepository.find(
            {},
            {
                strategy: LoadStrategy.SELECT_IN,
                limit: 10,
                offset: 0,
                orderBy: { id: QueryOrder.ASC }
            }
        ));
    }

    public async addProfessionnal(pro: ProDto): Promise<ProDto | null> {
        if (!pro) {
            throw new Error('Erreur : professionnel non défini');
        }
        try {
            const existingLocation = await this._proRepository.findOne({ name: pro.name });
            if (existingLocation) {
                throw new Error(`Le nom ${pro.name} est déjà utilisé.`);
            }

            const newPro = this._proRepository.create({
                name: pro.name,
                siret: pro.siret,
                email: pro.email,
                password: pro.password,
                image: pro.image,
            })

            await this._em.persistAndFlush(newPro);
            return newPro;
        } catch (error) {
            console.error(`Erreur lors de l'ajout du professionnel : ${error}`);
            return null;
        }
    }

    public async removeId(id: number): Promise<boolean> {
        const deleteId = await this._proRepository.nativeDelete({ id });
        return deleteId > 0;
    }
}


