import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateProductDto } from './validation/create-product.dto';
import { ProductService } from './product.service';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateProductDto) {
    const product = await this.productService.create(data);
    return product;
  }
}
