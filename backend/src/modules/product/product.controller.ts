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
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { basename, join } from 'path';
import { ProductService } from './product.service';
import { UpdateProductDto } from './validation';
import { CreateProductDto } from './validation/create-product.dto';
import { ImageValidationPipe } from './pipe/image-validation.pipe';
import { LoadByIDValidationDto } from './validation/load-by-id.validation';
import { LoadPipe } from './validation/load.pipe';

@Controller('/api/product')
export class ProductController {
  private appURL: string;
  private productUploadPath: string;
  constructor(
    private readonly productService: ProductService,
    configService: ConfigService,
  ) {
    this.appURL = configService.get('APP_URL') as string;
    this.productUploadPath = configService.get('PRODUCT_UPLOAD_PATH') as string;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.CREATED)
  public async create(
    @Body() data: CreateProductDto,
    @UploadedFile(new ImageValidationPipe()) image?: Express.Multer.File,
  ) {
    const product = await this.productService.create({
      ...data,
      imageFile: image,
    });
    return product;
  }

  @Get('image/:name')
  public getImage(@Param('name') name: string, @Res() res: Response) {
    const safeName = basename(name);
    const path = join(process.cwd(), `${this.productUploadPath}/${safeName}`);
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

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public async loadById(@Param() params: LoadByIDValidationDto) {
    const product = await this.productService.loadById(params.id);
    return product;
  }

  @Delete(':id')
  public async delete(@Param() params: LoadByIDValidationDto) {
    const data = await this.productService.delete(params.id);
    return data;
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(HttpStatus.OK)
  public async update(
    @Param() params: LoadByIDValidationDto,
    @Body() data: UpdateProductDto,
    @UploadedFile(new ImageValidationPipe()) image?: Express.Multer.File,
  ) {
    const product = await this.productService.update({
      ...data,
      id: params.id,
      imageFile: image,
    });
    return product;
  }
}
