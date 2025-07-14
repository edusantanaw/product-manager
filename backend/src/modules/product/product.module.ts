import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { RepositoryModule } from 'src/infra/repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    RepositoryModule,
    MulterModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('PRODUCT_UPLOAD_PATH'),
      }),
    }),
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
