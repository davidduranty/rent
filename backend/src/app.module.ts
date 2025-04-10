import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs'
import { config as mikroOrmConfig } from './config-orm/mikro-orm.config';
import { OrmModule } from './ormModule.module';


@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmConfig), OrmModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
