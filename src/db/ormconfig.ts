import 'reflect-metadata';

import * as dotenv from 'dotenv';

import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from '@/entities/user.entity';

if (!process.env.DB_HOST_WRITER) dotenv.config();

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
  entities: [User],
  migrations: ['.build/src/db/migrations/*.js'],
  migrationsTableName: '_migrations',
  subscribers: [],
  connectTimeout: 30000,
};

// export default data source used for running migrations via CLI
export const dataSource = new DataSource(dataSourceOptions);

export default dataSourceOptions;
