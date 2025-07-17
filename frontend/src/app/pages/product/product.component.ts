import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { PageContainerComponent } from "../../components/page-container/page-container.component";
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { CapitalizeWordsPipe } from "../../pipes/capitalize-words.pipe";
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";
import { ConvertPricePipe } from "../../pipes/convert-price.pipe";
import { NoDataComponent } from "../../components/no-data/no-data.component";
import { environment } from "../../../environments/environment";

@Component({
    selector: "product-screen",
    standalone: true,
    templateUrl: "./product.component.html",
    styleUrl: "./product.component.css",
    imports: [
        CommonModule,
        RouterModule,
        PaginationComponent,
        PageContainerComponent,
        CapitalizeWordsPipe,
        ConvertPricePipe,
        NoDataComponent
    ]
})
export class ProductComponent implements OnInit {
    page: number = 0;
    limit: number = 10;
    totalPages: number = 0
    search: string = ""
    products: Product[] = []
    loading: boolean = true
    defaultImgPath: string = "assets/default-product.png"

    constructor(
        private readonly productService: ProductService,
        private readonly activedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnInit() {
        this.activedRoute.queryParamMap.subscribe( (params) => {
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
                this.getTotalPages(data.total)
                this.loading = false
            },
            error: (error) => {
                console.log(error)
                this.loading = false
            }
        })
    }

    getTotalPages(total: number) {
        this.totalPages = Math.ceil(total / this.limit);
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = this.defaultImgPath;
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
                search: this.search,
                page: newPage
            },
            queryParamsHandling: 'merge'
        });
    }

    getProductImage(product: Product) {
        if (product.image) return `${environment.apiUrl}/product/image/${product.image}`
        return this.defaultImgPath
    }

    handleViewProduct(id: string) {
        this.router.navigateByUrl(`product/${id}`)
    }
}