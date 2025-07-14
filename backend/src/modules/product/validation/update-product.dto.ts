import { Transform } from 'class-transformer';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatorio!' })
  @IsString({ message: "O campo 'name' deve ser uma string" })
  name: string;
  @Transform((v) => Number(v.value))
  @IsPositive({ message: 'O Preço deve ser um número positivo' })
  price: number;
  @IsNotEmpty()
  @IsString({ message: "O campo 'description' deve ser uma string" })
  description: string;
  image?: string;
  id: string;
}
