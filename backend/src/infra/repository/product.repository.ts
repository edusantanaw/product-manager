import { Injectable } from '@nestjs/common';
import { DataSource, ILike, Repository } from 'typeorm';
import { ProductEntity } from '../entity';
import { CreateProductDto } from 'src/modules/product/validation/create-product.dto';

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

  public async create(data: CreateProductDto): Promise<ProductEntity> {
    const product = new ProductEntity(data);
    const createdProduct = await this.repository.save(product);
    return createdProduct;
  }

  public async load(
    data: ILoadAllWithFilterAndPagination,
  ): Promise<[ProductEntity[], number]> {
    const products = await this.repository.findAndCount({
      take: data.limit,
      skip: data.page * data.limit,
      where: [
        { name: ILike(`%${data.search ?? ''}%`), deleted: 0 },
        { description: ILike(`%${data.search ?? ''}%`), deleted: 0 },
      ],
    });
    return products;
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
