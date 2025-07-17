import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CapitalizeWordsPipe } from "../../pipes/capitalize-words.pipe";
import { Product } from "../../types/product";
import { DeleteProductComponent } from "../delete-product/delete-product.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { ConvertPricePipe } from "../../pipes/convert-price.pipe";
import { environment } from "../../../environments/environment";

@Component({
    selector: 'product-list',
    templateUrl: "./product-list.component.html",
    styleUrl: "./product-list.component.css",
    standalone: true,
    imports: [
        CommonModule,
        PaginationComponent,
        CapitalizeWordsPipe,
        RouterModule,
        DeleteProductComponent,
        ConvertPricePipe
    ]
})
export class ProductListComponent {
    @Input({ required: true }) products: Product[] = []
    @Input({ required: true }) page: number = 0;
    @Input({ required: true }) limit: number = 10;
    @Input({ required: true }) totalPages: number = 0
    @Input({ required: false }) onUpdate: () => void = () => { }
    defaultImgPath: string = "assets/default-product.png"
    showDeleteProduct: boolean = false
    deleteProductId: string | null = null

    constructor(
        private readonly router: Router,
        private readonly activedRoute: ActivatedRoute,
    ) { }

    getProductImage(product: Product) {
        if (product.image) return `${environment.apiUrl}/product/image/${product.image}`
        return this.defaultImgPath
    }

    onImageError(event: Event) {
        const target = event.target as HTMLImageElement;
        target.src = this.defaultImgPath;
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

    handleCloseDeleteModal() {
        this.deleteProductId = null
        this.showDeleteProduct = false
    }

    setDeleteProductId(id: string) {
        this.deleteProductId = id;
        this.showDeleteProduct = true
    }
}