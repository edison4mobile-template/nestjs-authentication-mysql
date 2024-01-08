import 'reflect-metadata';

import * as dotenv from 'dotenv';
import * as path from 'path';

import { DataSource, DataSourceOptions } from 'typeorm';

if (!process.env.DB_HOST_WRITER) dotenv.config();

const entitiesPath = path.join(__dirname, '/../models/*.entity.{js,ts}');

const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  port: 3306,
  host: process.env.DB_HOST_WRITER,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  poolSize: 10,
  entities: [entitiesPath],
  migrations: ['.build/src/db/migrations/*.js'],
  migrationsTableName: '_migrations',
  subscribers: [],
  connectTimeout: 30000,
};

// export default data source used for running migrations via CLI
export const dataSource = new DataSource(dataSourceOptions);

export default dataSourceOptions;
