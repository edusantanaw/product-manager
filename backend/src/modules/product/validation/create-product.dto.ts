import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { SanitizeHTML } from '../decorators/sanitize.decorator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatorio!' })
  @IsString({ message: "O campo 'nane' deve ser uma string" })
  name: string;
  @Transform((v) => Number(v.value))
  @IsPositive({ message: 'O Preço deve ser um número positivo' })
  price: number;
  @IsNotEmpty()
  @IsString({ message: "O campo 'description' deve ser uma string" })
  @SanitizeHTML()
  description: string;
  imageFile?: Express.Multer.File;
}
