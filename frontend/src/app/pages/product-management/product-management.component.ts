import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { NewProductComponent } from "../../components/new-product/new-product.component";
import { PageContainerComponent } from "../../components/page-container/page-container.component";
import { ProductListComponent } from "../../components/product-list/product-list.component";
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";
import { AppButtonComponent } from "../../components/app-button/app-button.component";

@Component({
    selector: "product-management",
    standalone: true,
    templateUrl: "./product-management.component.html",
    styleUrl: "./product-management.component.css",
    imports: [
        PageContainerComponent,
        CommonModule,
        NewProductComponent,
        RouterModule,
        ProductListComponent,
        AppButtonComponent
    ],
})
export class ProductManagementComponent implements OnInit {
    showCreateProduct: boolean = false
    page: number = 0;
    limit: number = 10;
    totalPages: number = 0
    products: Product[] = []
    loading: boolean = true

    constructor(
        private readonly productService: ProductService,
        private readonly activedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.activedRoute.queryParamMap.subscribe(params => {
            this.page = Number(params.get('page')) || 0;
            this.fetchData()
        });
    }

    fetchData() {
        this.productService.getProducts({
            page: this.page,
            limit: this.limit,
            search: ""
        }).subscribe({
            next: (data: { data: Product[], total: number }) => {
                this.products = [...(data?.data ?? [])];
                this.getTotalPages(data.total)
                this.loading = false
            },
            error: (error) => {
                console.log(error)
                this.loading = false
            }
        })
    }

    isLoading() {
        return this.loading
    }

    getTotalPages(total: number) {
        this.totalPages = Math.ceil(total / this.limit);
    }

    handleShowCreate() {
        this.showCreateProduct = !this.showCreateProduct
    }
}