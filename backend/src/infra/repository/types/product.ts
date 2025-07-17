export interface ICreateProduct {
  name: string;
  price: number;
  description: string;
  image?: string;
}

export interface IUpdateProduct extends ICreateProduct {
  id: string;
}
