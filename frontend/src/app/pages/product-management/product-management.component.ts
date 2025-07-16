import { CommonModule } from "@angular/common";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { NewProductComponent } from "../../components/new-product/new-product.component";
import { PageContainerComponent } from "../../components/page-container/page-container.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CapitalizeWordsPipe } from "../../pipes/capitalize-words.pipe";
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";

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
        PaginationComponent,
        CapitalizeWordsPipe,
    ],
})
export class ProductManagementComponent implements OnInit {
    showCreateProduct: boolean = false
    page: number = 0;
    limit: number = 10;
    totalPages: number = 0
    products: Product[] = []
    loading: boolean = true
    defaultImgPath: string = "assets/default-product.png"


    constructor(
        private readonly productService: ProductService,
        private readonly activedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef
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
                this.cdr.detectChanges(); 
            },
            error: (error) => {
                this.loading = false
                this.cdr.detectChanges(); 
            }
        })
    }

    getProducts() {
        return this.products
    }

    isLoading() {
        return this.loading
    }

    getTotalPages(total: number) {
        this.totalPages = Math.ceil(total / this.limit);
    }

    getProductImage(product: Product) {
        if (product.image) return product.image
        return this.defaultImgPath
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = this.defaultImgPath;
    }

    formatPrice(price: number) {
        if (!price) return "R$ 0,00"
        return price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    trackById(_index: number, item: any): number {
        return item.id;
    }

    handlePage(page: number) {
        let newPage = page
        if (page < 0) {
            newPage = 0;
        }
        if (page > (this.totalPages)) {
            newPage = this.totalPages - 1
        }
        this.router.navigate([], {
            relativeTo: this.activedRoute,
            queryParams: {
                page: newPage
            },
            queryParamsHandling: 'merge'
        });
    }

    handleShowCreate() {
        this.showCreateProduct = !this.showCreateProduct
    }
}