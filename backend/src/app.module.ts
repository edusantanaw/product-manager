import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database/postgres';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
  ],
})
export class AppModule {}
