import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product";
import { PageContainerComponent } from "../../components/page-container/page-container.component";
import { CommonModule } from "@angular/common";
import { CapitalizeWordsPipe } from "../../pipes/capitalize-words.pipe";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CartService } from "../../services/cart.service";

@Component({
    standalone: true,
    selector: "view-product",
    templateUrl: "./view-product.component.html",
    styleUrl: "./view-product.component.css",
    imports: [
        RouterModule,
        PageContainerComponent,
        RouterModule,
        CommonModule,
        CapitalizeWordsPipe]
})
export class ViewProductComponent implements OnInit {
    product!: Product
    loading: boolean = true
    showFullDescription: boolean = false;
    defaultImgPath: string = "assets/default-product.png"
    itemQtd: number = 1

    constructor(
        private readonly activedRoute: ActivatedRoute,
        private readonly productService: ProductService,
        private readonly router: Router,
        private readonly sanitizer: DomSanitizer,
        private readonly cartService: CartService
    ) { }

    ngOnInit(): void {
        this.activedRoute.paramMap.subscribe((params) => {
            const id = params.get("id")
            if (!id) return
            this.getProductById(id)
        })
    }

    getProductById(id: string) {
        this.productService.getProductById(id).subscribe({
            next: (product) => {
                this.product = product
                this.loading = false
            },
            error: (err) => {
                this.loading = false;
                this.router.navigateByUrl("not-found")
            }
        })
    }

    getProductImage() {
        if (this?.product?.image) return this.product.image
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

    getTruncatedDescription(): SafeHtml {
        if (!this.product?.description) return '';

        const html = this.product.description;

        if (this.showFullDescription || html.length <= 300) {
            return this.sanitizer.bypassSecurityTrustHtml(html);
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const plainText = tempDiv.innerText;

        const limited = plainText.slice(0, 300) + '...';
        return this.sanitizer.bypassSecurityTrustHtml(`<p>${limited}</p>`);
    }

    shouldShowToggle(): boolean {
        return this.product?.description?.length > 300;
    }

    toggleDescription(): void {
        this.showFullDescription = !this.showFullDescription;
    }

    addProduct() {
        this.cartService.addToCart(this.product, this.itemQtd)
        this.cartService.open()
        this.itemQtd = 1
    }

    increase() {
        this.itemQtd += 1
    }

    decrease() {
        if (this.itemQtd === 1) return
        this.itemQtd -= 1
    }
}

