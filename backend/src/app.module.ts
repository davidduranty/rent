// app.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { config as mikroOrmConfig } from './config-orm/mikro-orm.config';
import { OrmModule } from './ormModule.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    OrmModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  providers: [],
  controllers: [],
})
export class AppModule { }