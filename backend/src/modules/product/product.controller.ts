import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './validation/create-product.dto';
import { ProductService } from './product.service';
import { LoadPipe } from './validation/load.pipe';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() data: CreateProductDto) {
    const product = await this.productService.create(data);
    return product;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async load(
    @Query(LoadPipe) data: { page: number; limit: number; search: string },
  ) {
    const product = await this.productService.load(data);
    return product;
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    const data = await this.productService.delete(id);
    return data;
  }
}
