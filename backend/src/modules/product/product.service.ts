import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infra/repository';
import { CreateProductDto } from './validation/create-product.dto';
import { ProductEntity } from 'src/infra';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create(data);
    return product;
  }
}
