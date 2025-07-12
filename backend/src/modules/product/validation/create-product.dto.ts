import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatorio!' })
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
  @IsNotEmpty()
  @IsString()
  description: string;
}
