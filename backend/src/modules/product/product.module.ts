import { EnvVariables } from 'src/config/constants/env-variables';
import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/infra/repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    RepositoryModule,
    MulterModule.register({ dest: EnvVariables.PRODUCT_UPLOAD_PATH }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
