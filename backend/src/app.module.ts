import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database/postgres';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ProductModule, TypeOrmModule.forRoot(DatabaseConfig)],
})
export class AppModule {}
