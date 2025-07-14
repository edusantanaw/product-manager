import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'reflect-metadata';
import { ProductEntity } from 'src/infra';

export class DatabaseConfig {
  public static get(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('PGHOST'),
      port: Number(configService.get('PGPORT')),
      username: configService.get('PGUSER'),
      password: configService.get('PGPASSWORD'),
      database: configService.get('PGDATABASE'),
      synchronize: true,
      logging: false,
      entities: [ProductEntity],
      migrations: [],
      subscribers: [],
    };
  }
}
