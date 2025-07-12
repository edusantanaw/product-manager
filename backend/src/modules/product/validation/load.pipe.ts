import { Injectable, PipeTransform } from '@nestjs/common';

interface LoadObject {
  page: string;
  limit: string;
}

@Injectable()
export class LoadPipe implements PipeTransform {
  transform(value: LoadObject) {
    return {
      ...value,
      page: value?.page ? Number(value.page) : 0,
      limit: value?.limit ? Number(value.limit) : 50,
    };
  }
}
