import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "src/models/jwt-payload.interface";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "@entities/user.entity";
import { EntityRepository } from "@mikro-orm/core";
import { UserDTO } from "src/models/user.model";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private configService: ConfigService, @InjectRepository(User) private readonly _userRepository: EntityRepository<UserDTO>) {
        super({ jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => { return req.cookies?.access_token; },]), ignoreExpiration: false, secretOrKey: configService.get<string>("JWT_SECRET_ACCESS"), });
    }


    async validate(payload: JwtPayload,): Promise<{ sub: number; email: string }> {
        const login = await this._userRepository.findOne({ id: payload.sub, });
        if (!login) {
            throw new UnauthorizedException();
        }
        return { sub: login.id!, email: login.email };
    }
}