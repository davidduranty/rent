import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDTO } from 'src/models/user.model';
import { LoginDto } from 'src/models/login.models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly _userRepository: EntityRepository<UserDTO>,
        private readonly _jwtService: JwtService,
        private readonly _configService: ConfigService,
        private readonly _em: EntityManager) { }

    async register(user: UserDTO): Promise<UserDTO> {
        const existingUser = await this._userRepository.findOne({ email: user.email.toLowerCase() });

        if (existingUser) {
            throw new Error(`L'email ${user.email} est déjà utilisé.`);
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this._em.create(User, {
            ...user,
            isAdmin: false,
            email: user.email.toLowerCase(),
            password: hashedPassword,
        });
        await this._em.persistAndFlush(newUser);
        return {
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            password: "",
            email: newUser.email,
            birthday: newUser.birthday,
            isAdmin: newUser.isAdmin,
            professionnal: newUser.professionnal
        };

    }

    async login(login: LoginDto): Promise<{ accessToken: string }> {
        const user = await this._userRepository.findOne({ email: login.email.toLowerCase() });

        if (!user) {
            throw new Error(`Aucun utilisateur trouvé avec l'email ${login.email}`);
        }

        const isPasswordValid = await bcrypt.compare(login.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Mot de passe incorrect');
        }

        const accessToken = await this.generateAccessToken(user);

        return { accessToken };

    }

    private async generateAccessToken(user: UserDTO): Promise<string> {
        const payload = { sub: user.id, email: user.email };
        return this._jwtService.sign(payload, {
            secret: process.env.JWT_SECRET_ACCESS,
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1h',
        });
    }
}
