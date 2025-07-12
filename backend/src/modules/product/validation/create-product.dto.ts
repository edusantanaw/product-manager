import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatorio!' })
  @IsString({ message: "O campo 'nome' deve ser uma string" })
  name: string;
  @IsPositive({ message: 'O Preço deve ser um número positivo' })
  price: number;
  @IsNotEmpty()
  @IsString({ message: "O campo 'description' deve ser uma string" })
  description: string;
}
