import type { Product } from "./types.js";

export function createProduct(productDate: Product): Product {
    return productDate;
}

export function calculateLineTotal(price: number, quantity: number, discountPercent: number = 0): number {

    if(price < 0 || quantity < 0 || discountPercent < 0) {
        throw new Error("Price, quantity, and discount percent must be non-negative.");
    }

    return price * quantity * (1 - discountPercent / 100);
}