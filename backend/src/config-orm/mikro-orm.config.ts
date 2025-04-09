import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Logger } from "@nestjs/common";
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const logger = new Logger('mikroORM')

const config = {
    ensureDatabase: true,
    autoLoadEntities: true,
    driver: PostgreSqlDriver,
    dbName: 'rentacar',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Tyranisus!1',
    highlighter: new SqlHighlighter(),
    debug: true,
    logger: logger.log.bind(logger),
}

export { config }