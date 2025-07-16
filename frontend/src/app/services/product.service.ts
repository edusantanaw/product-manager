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
    private baseURL: string = "http://localhost:3000/api/product"
    constructor(private readonly httpClient: HttpClient) { }

    getProducts(data: IGetAllProductData) {
        return this.httpClient.get<{ data: Product[], total: number }>(`${this.baseURL}?limit=${data.limit}&page=${data.page}&search=${data?.search}`)
    }

    getProductById(id: string) {
        return this.httpClient.get<Product>(`${this.baseURL}/${id}`)
    }

    createProduct(data: FormData) {
        return this.httpClient.post<Product>(`${this.baseURL}`, data)
    }

    deleteProduct(id: string) {
        return this.httpClient.delete<Product>(`${this.baseURL}/${id}`)
    }
}