import { IsUUID } from 'class-validator';

export class LoadByIDValidationDto {
  @IsUUID('all', { message: 'ID precisa ser um UUID válido' })
  id: string;
}
