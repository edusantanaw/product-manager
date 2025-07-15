import { Component, OnInit } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Product } from "../types/product";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

@Component({
    selector: "product-screen",
    standalone: true,
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.css",
    imports: [CommonModule, RouterModule]
})
export class ProductComponent implements OnInit {
    page: number = 0;
    limit: number = 20;
    totalPages: number = 0
    search: string = ""
    products: Product[] = []
    loading: boolean = true

    constructor(
        private readonly productService: ProductService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(params => {
            this.search = params.get('search') ?? '';
            this.page = Number(params.get('page')) || 0;
            this.fetchData()
        });
    }

    fetchData() {
        this.productService.getProducts({
            page: this.page,
            limit: this.limit,
            search: this.search
        }).subscribe({
            next: (data: { data: Product[], total: number }) => {
                this.products = data?.data ?? []
                this.totalPages = data.total / this.limit
                this.loading = false
            },
            error: (error) => {
                console.log(error)
                this.loading = false
            }
        })
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = 'assets/default-product.png';
    }

    formatPrice(price: number) {
        if (!price) return "R$ 0,00"
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }
}