import { User } from '@entities/user.entity';
import { EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/models/user.model';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User) private readonly _userService: EntityRepository<UserDTO>

    ) { }

    public async getAll(): Promise<UserDTO[]> {
        const users = await this._userService.find(
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
        return users
    }

    public async getByName(name: string): Promise<UserDTO> {
        const result = await this._userService.findOne(
            { name: { $ilike: name } },
            {
                // populate: ['publicHoliday', 'vehicles'],
                // populateOrderBy: { publicHoliday: { id: QueryOrder.ASC } },
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
            surname: result.surname,
            email: result.email,
            birthday: result.birthday,
            isAdmin: result.isAdmin,
            professionnal: result.professionnal
        } as UserDTO;
    }

}
