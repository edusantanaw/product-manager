import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infra/repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [RepositoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
