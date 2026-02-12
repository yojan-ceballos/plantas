import { type Product } from './products';

export interface CartItem {
    product: Product;
    quantity: number;
    potStyle?: string;
}

export const initialCartItems: CartItem[] = [];

export const getCartSubtotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
};

export const FREE_SHIPPING_THRESHOLD = 120;
