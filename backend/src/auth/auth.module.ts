import { Module } from '@nestjs/common';
import { AuthService } from '@services/auth/auth.service';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { OrmModule } from 'src/ormModule.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EntityRepository } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@entities/user.entity';



@Module({
    imports: [MikroOrmModule.forFeature([User]), OrmModule, JwtModule.registerAsync({ useFactory: async (configService: ConfigService) => ({ secret: configService.get<string>("JWT_SECRET_ACCESS"), signOptions: { expiresIn: configService.get<string>("JWT_ACCESS_TOKEN_EXPIRATION"), }, }), inject: [ConfigService], })],
    controllers: [AuthController],
    providers: [AuthService, EntityRepository, JwtService],
    exports: [AuthService, JwtModule],
})
export class AuthModule {

}
