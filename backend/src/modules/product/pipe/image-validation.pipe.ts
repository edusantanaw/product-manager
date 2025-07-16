import { PipeTransform } from '@nestjs/common';
import { InvalidUploadError } from '../error/invalid-upload';

export class ImageValidationPipe implements PipeTransform {
  transform(value?: Express.Multer.File) {
    if (!value) return true;

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024;

    if (value.size > maxSize) {
      throw new InvalidUploadError(
        'O arquivo excede o tamanho máximo permitido (10MB).',
      );
    }
    if (!validTypes.includes(value.mimetype)) {
      throw new InvalidUploadError(
        'Tipo de arquivo inválido. Apenas imagens são permitidas.',
      );
    }
    return value;
  }
}
