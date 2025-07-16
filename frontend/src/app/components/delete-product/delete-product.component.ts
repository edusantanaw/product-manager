import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ModalComponent } from "../modal/modal.component";
import { SweetAlertComponent } from "../sweet-alert/sweet-alert.component";
import { CartService } from "../../services/cart.service";

@Component({
    selector: "delete-product",
    templateUrl: "./delete-product.component.html",
    styleUrl: "./delete-product.component.css",
    imports: [
        ModalComponent,
        SweetAlertComponent,
        CommonModule,
    ],
    standalone: true
})
export class DeleteProductComponent {
    @Input({ required: true }) onSuccess!: () => void
    @Input({ required: true }) onClose!: () => void
    @Input({ required: true }) id!: string
    errorAlert: boolean = false;
    errorMessage: string = ""
    deleteRunning: boolean = false;
    confirmModal: boolean = false;

    constructor(
        private readonly productService: ProductService,
        protected readonly cartService: CartService
    ) { }

    onConfirmDelete() {
        this.confirmModal = false;
        this.onSuccess()
        this.onClose()
    }

    onConfirmError() {
        this.errorAlert = false
        this.errorMessage = ""
    }

    onDelete() {
        this.deleteRunning = true
        this.productService.deleteProduct(this.id).subscribe(({
            next: () => {
                this.confirmModal = true
                this.deleteRunning = true
                this.cartService.removeFromCart(this.id)
            },
            error: (err) => {
                const { error: { errors } } = err as { error: { errors: string[] } }
                this.errorMessage = errors[0]
                this.errorAlert = true
                this.deleteRunning = true
            }
        }))
    }
}