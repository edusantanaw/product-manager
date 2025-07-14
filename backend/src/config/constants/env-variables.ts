export class EnvVariables {
  static PORT: number = Number(process.env.PORT ?? 3000);
  static PRODUCT_UPLOAD_PATH: string =
    process.env.PRODUCT_UPLOAD_PATH ?? 'public/uploads/product';
  static APP_URL: string = process.env.APP_URL ?? 'http://localhost:3000';
}
