import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../types/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
    private key: string = "@app-cart"
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItems.asObservable();

    constructor() {
        const products = localStorage.getItem(this.key)
        if (products) {
            const parsedProducts: CartItem[] = JSON.parse(products)
            this.cartItems.value.push(...parsedProducts)
        }
        this.cartItems.subscribe({
            next: (carts) => {
                this.saveCartOnStorage(carts)
            }
        })
    }

    private isOpen = new BehaviorSubject<boolean>(false)
    isOpen$ = this.isOpen.asObservable();

    getCart(): CartItem[] {
        return this.cartItems.getValue();
    }

    addToCart(product: Product, quantity = 1) {
        const current = this.getCart();
        const existing = current.find(item => item.product.id === product.id);

        if (existing) {
            existing.quantity += quantity;
        } else {
            current.push({ product, quantity });
        }

        this.cartItems.next([...current]);
    }

    increaseQuantity(productId: string) {
        const updated = this.getCart().map(item => {
            if (item.product.id === productId) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        this.cartItems.next(updated);
    }

    decreaseQuantity(productId: string) {
        let updated = this.getCart().map(item => {
            if (item.product.id === productId) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        }).filter(item => item.quantity > 0);

        this.cartItems.next(updated);
    }

    removeFromCart(productId: string) {
        const updated = this.getCart().filter(item => item.product.id !== productId);
        this.cartItems.next(updated);
    }

    getTotal(): number {
        return this.getCart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }

    getTotalQuantity(): number {
        return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    }

    open() {
        this.isOpen.next(true);
    }

    close() {
        this.isOpen.next(false);
    }

    private saveCartOnStorage(products: CartItem[]) {
        localStorage.setItem(this.key, JSON.stringify(products))
    }
}


