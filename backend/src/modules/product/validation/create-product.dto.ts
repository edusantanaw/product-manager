import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatorio!' })
  @IsString({ message: "O campo 'nane' deve ser uma string" })
  name: string;
  @Transform((v) => Number(v.value))
  @IsPositive({ message: 'O Preço deve ser um número positivo' })
  price: number;
  @IsNotEmpty()
  @IsString({ message: "O campo 'description' deve ser uma string" })
  @Transform((params: TransformFnParams) => {
    const desc = sanitizeHtml(params.value ?? '') as string;
    return desc;
  })
  description: string;
  image?: string;
}
