import { User } from '@entities/user.entity';
import { EntityManager, EntityRepository, LoadStrategy, QueryOrder } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/models/user.model';

@Injectable()
export class UserService {
    public constructor(
        @InjectRepository(User) private readonly _userRepository: EntityRepository<UserDTO>,
        private readonly _em: EntityManager,

    ) { }

    public async getAll(): Promise<UserDTO[]> {
        const users = await this._userRepository.find(
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
        const result = await this._userRepository.findOne(
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

    async getUsers(page: number, limit: number) {
        const [users, totalCount] = await this._userRepository.findAndCount(
            {},
            { offset: (page - 1) * limit, limit }
        );

        return {
            users,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page,
        };
    }

    public async update(id: number, user: User): Promise<UserDTO> {
        const result = await this._userRepository.findOne({ id })

        if (!result) {
            throw new Error(`Aucun utilisatuer trouvé avec l'ID "${id}".`);
        }

        result.name = user.name;
        result.surname = user.surname;
        result.email = user.email;
        result.password = user.password;
        result.birthday = user.birthday;
        result.isAdmin = user.isAdmin;
        result.professionnal = user.professionnal;
        await this._em.persistAndFlush(result);

        return result;
    }

    public async addUser(user: UserDTO): Promise<UserDTO | null> {
        try {
            const existingUser = await this._userRepository.findOne({ email: user.email });

            if (existingUser) {
                throw new Error(`L'email ${user.email} est déjà utilisé.`);
            }

            // Ne pas assigner manuellement l'ID (il doit être auto-incrémenté)
            const newUser = this._userRepository.create({
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password,
                birthday: user.birthday,
                isAdmin: user.isAdmin,
                professionnal: user.professionnal
            });

            await this._em.persistAndFlush(newUser);
            return newUser;
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'utilisateur :", error);
            return null;
        }
    }


    public async removeId(id: number): Promise<boolean> {
        const deleteId = await this._userRepository.nativeDelete({ id })

        return deleteId > 0;
    }

}
