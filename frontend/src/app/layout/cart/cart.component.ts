import { Component, OnInit } from "@angular/core";
import { CartService, CartItem } from "../../services/cart.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "cart",
    standalone: true,
    templateUrl: "./cart.component.html",
    styleUrl: "./cart.component.css",
    imports: [CommonModule],
})
export class CartComponent implements OnInit {
    isOpen: boolean = false;
    cartItems: CartItem[] = [];
    total: number = 0;

    constructor(private readonly cartService: CartService) { }

    ngOnInit(): void {
        this.cartService.isOpen$.subscribe(status => {
            this.isOpen = status;
        });

        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
            this.total = this.cartService.getTotal();
        });
    }

    closeCart() {
        this.cartService.close();
    }

    removeItem(productId: string) {
        this.cartService.removeFromCart(productId);
    }

    increase(productId: string) {
        this.cartService.increaseQuantity(productId);
    }

    decrease(productId: string) {
        this.cartService.decreaseQuantity(productId);
    }
}
