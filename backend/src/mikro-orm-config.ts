import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Logger } from "@nestjs/common";
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const logger = new Logger('mikroOrm')

const config = {
    ensureDatabase: true,
    autoLoadEntities: true,
    driver: PostgreSqlDriver,
    dbName: 'rent_a_car_db',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin',
    highlighter: new SqlHighlighter(),
    debug: true,
    logger: logger.log.bind(logger),
}

export { config }