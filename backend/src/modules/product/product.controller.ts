import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { ProductService } from './product.service';
import { CreateProductDto } from './validation/create-product.dto';
import { LoadPipe } from './validation/load.pipe';
import { join } from 'path';
import { EnvVariables } from 'src/config/constants/env-variables';
import { UpdateProductDto } from './validation';

@Controller('/api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() data: CreateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const url = EnvVariables.APP_URL;
    const product = await this.productService.create({
      ...data,
      image: image ? `${url}/api/product/${image.filename}/image` : undefined,
    });
    return product;
  }

  @Get(':name/image')
  public getImage(@Param('name') name: string, @Res() res: Response) {
    const path = join(
      process.cwd(),
      `${EnvVariables.PRODUCT_UPLOAD_PATH}/${name}`,
    );
    if (!existsSync(path)) {
      return res.status(HttpStatus.NOT_FOUND).end();
    }
    const file = createReadStream(path);
    file.pipe(res);
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

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const url = EnvVariables.APP_URL;
    const product = await this.productService.update({
      ...data,
      id,
      image: image ? `${url}/api/product/${image.filename}/image` : undefined,
    });
    return product;
  }
}
