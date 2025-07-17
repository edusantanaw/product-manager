import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/infra/repository';
import { CreateProductDto } from './validation/create-product.dto';
import { ProductEntity } from 'src/infra';
import { UpdateProductDto } from './validation';
import { NotFoundError } from './error/not-found.error';

interface ILoadAllWithFilterAndPagination {
  limit: number;
  page: number;
  search?: string;
}

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.create({
      ...data,
      image: data.imageFile ? data.imageFile.filename : undefined,
    });
    return product;
  }

  public async load(
    data: ILoadAllWithFilterAndPagination,
  ): Promise<{ data: ProductEntity[]; total: number }> {
    const products = await this.productRepository.load(data);
    return products;
  }

  public async delete(id: string): Promise<{ message: string }> {
    const productExists = await this.productRepository.loadById(id);
    if (!productExists) throw new NotFoundError('Produto não encontrado!');
    await this.productRepository.softDelete(id);
    return { message: 'Produto removido com sucesso!' };
  }

  public async update(data: UpdateProductDto): Promise<ProductEntity> {
    const productExists = await this.productRepository.loadById(data.id);
    if (!productExists) throw new NotFoundError('Produto não encontrado!');
    const updatedProduct = await this.productRepository.update({
      ...data,
      image: data.imageFile ? data.imageFile.filename : undefined,
    });
    return updatedProduct;
  }

  public async loadById(id: string) {
    const product = await this.productRepository.loadById(id);
    if (!product) throw new NotFoundError('Produto não encontrado!');
    return product;
  }
}
