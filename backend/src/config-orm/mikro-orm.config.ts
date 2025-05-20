import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import * as dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } = process.env;

const logger = new Logger('mikroORM');

const config = {
  autoLoadEntities: true,
  driver: PostgreSqlDriver,
  dbName: DB_NAME,
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : 5432,
  user: DB_USER,
  password: DB_PASSWORD,
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
};

export { config };