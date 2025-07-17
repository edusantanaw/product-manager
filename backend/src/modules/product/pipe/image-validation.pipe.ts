import { PipeTransform } from '@nestjs/common';
import { InvalidUploadError } from '../error/invalid-upload';

export class ImageValidationPipe implements PipeTransform {
  private readonly validTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];
  private readonly maxSize = 10 * 1024 * 1024;

  transform(file?: Express.Multer.File): Express.Multer.File | undefined {
    if (!file) return file;

    if (!this.isValidType(file.mimetype)) {
      throw new InvalidUploadError(
        'Tipo de arquivo inválido. Apenas imagens são permitidas.',
      );
    }

    if (file.size > this.maxSize) {
      throw new InvalidUploadError(
        'O arquivo excede o tamanho máximo permitido (10MB).',
      );
    }

    return file;
  }

  private isValidType(type: string): boolean {
    return this.validTypes.includes(type);
  }
}
