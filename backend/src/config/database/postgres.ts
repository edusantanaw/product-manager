import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'reflect-metadata';
import { ProductEntity } from 'src/infra';

const PGHOST = process.env.PGHOST;
const PGDATABASE = process.env.PGDATABASE;
const PGUSER = process.env.PGUSER;
const PGPASSWORD = process.env.PGPASSWORD;
const PGPORT = process.env.PGPORT;

console.log(PGHOST);

export const DatabaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: PGHOST,
  port: Number(PGPORT),
  username: PGUSER,
  password: PGPASSWORD,
  database: PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [ProductEntity],
  migrations: [],
  subscribers: [],
};
