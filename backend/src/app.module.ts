import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database/postgres';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        DatabaseConfig.get(configService),
    }),
    ProductModule,
  ],
})
export class AppModule {}
