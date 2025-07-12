import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from '../entity';
import { CreateProductDto } from 'src/modules/product/validation/create-product.dto';

@Injectable()
export class ProductRepository {
  protected readonly repository: Repository<ProductEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(ProductEntity);
  }

  public async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity(data);
    const createdProduct = await this.repository.save(product);
    return createdProduct;
  }
}
