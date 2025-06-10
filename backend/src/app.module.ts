// app.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { config as mikroOrmConfig } from './config-orm/mikro-orm.config';
import { OrmModule } from './ormModule.module';
import { ProfessionnalService } from './services/professionnal/professionnal.service';
import { ProfessionnalController } from './controllers/professionnal/professionnal.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    OrmModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule { }