import { DataSource, DataSourceOptions } from 'typeorm';
import { createDataSourceOptions } from './create-data-source-options';
import { config } from 'dotenv';
import { join } from 'path';
config();

import { envSchema } from '../typed-config/env.schema';
const env = envSchema.parse(process.env);

const dataSourceOptions: DataSourceOptions = createDataSourceOptions({
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  entities: ['src/**/*.orm{.ts,.js}'],
  migrations: [join(__dirname, 'migrations/**/*.ts')],
  migrationsTableName: 'migrations',
  logging: env.IS_LOCAL,
});

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
