import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../types/product";

type IGetAllProductData = {
    page: number;
    limit: number;
    search?: string
}

@Injectable({
    providedIn: "root"
})
export class ProductService {
    constructor(private readonly httpClient: HttpClient) { }

    getProducts(data: IGetAllProductData) {
        return this.httpClient.get<{data: Product[], total: number}>(`http://localhost:3000/api/product?limit=${data.limit}&page=${data.page}&search=${data?.search}`)
    }
}