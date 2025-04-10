import { DataSourceOptions } from 'typeorm';

interface CreateDataSourceOptionsParams {
  host: string;
  port: number;
  username: string;
  password: string;
  logging: boolean;
  entities: string[];
  migrations?: string[];
  migrationsTableName?: string;
}

export const createDataSourceOptions = (
  params: CreateDataSourceOptionsParams,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: params.host,
    port: params.port,
    username: params.username,
    password: params.password,
    logging: params.logging,

    entities: params.entities,
    migrations: params.migrations,
    migrationsTableName: params.migrationsTableName,
    migrationsRun: false,
    synchronize: false,
  };
};
