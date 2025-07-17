import { Injectable } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entity';
import { ICreateProduct, IUpdateProduct } from './types/product';

interface ILoadAllWithFilterAndPagination {
  limit: number;
  page: number;
  search?: string;
}

@Injectable()
export class ProductRepository {
  protected readonly repository: Repository<ProductEntity>;
  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(ProductEntity);
  }

  public async create(data: ICreateProduct): Promise<ProductEntity> {
    const product = new ProductEntity()
      .setName(data.name)
      .setDescription(data.description)
      .setImage(data.image)
      .setPrice(data.price);
    const createdProduct = await this.repository.save(product);
    return createdProduct;
  }

  public async update(data: IUpdateProduct) {
    const product = new ProductEntity()
      .setId(data.id)
      .setName(data.name)
      .setImage(data.image)
      .setPrice(data.price)
      .setDescription(data.description);
    await this.repository.save(product);
    const updated = this.repository.findOneOrFail({ where: { id: data.id } });
    return updated;
  }

  public async load(
    data: ILoadAllWithFilterAndPagination,
  ): Promise<{ data: ProductEntity[]; total: number }> {
    const [products, total] = await this.repository.findAndCount({
      take: data.limit,
      skip: data.page * data.limit,
      where: [
        { name: ILike(`%${data.search ?? ''}%`), deleted: 0 },
        { description: ILike(`%${data.search ?? ''}%`), deleted: 0 },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      total,
      data: products,
    };
  }

  public async loadById(id: string) {
    const product = await this.repository.findOne({ where: { id } });
    return product;
  }

  public async softDelete(id: string) {
    await this.repository.update(id, {
      deleted: 1,
    });
  }
}
