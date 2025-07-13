import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infra/repository';
import { CreateProductDto } from './validation/create-product.dto';
import { ProductEntity } from 'src/infra';

interface ILoadAllWithFilterAndPagination {
  limit: number;
  page: number;
  search?: string;
}

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create(data);
    return product;
  }

  public async load(data: ILoadAllWithFilterAndPagination) {
    const products = await this.productRepository.load(data);
    return products;
  }

  public async delete(id: string) {
    const productExists = await this.productRepository.loadById(id);
    if (!productExists) throw new Error('Produto não encontrado!');
    await this.productRepository.softDelete(id);
    return { message: 'Produto removido com sucesso!' };
  }
}
