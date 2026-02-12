import { type Product, products } from './products';

export interface CartItem {
    product: Product;
    quantity: number;
    potStyle?: string;
}

export const initialCartItems: CartItem[] = [
    { product: products[0], quantity: 1, potStyle: '10" Clay Pot' },
    { product: products[7], quantity: 2, potStyle: '500ml • Pack of 2' },
    { product: products[2], quantity: 1, potStyle: '4" Ceramic Pot' },
];

export const getCartSubtotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

export const getCartCount = (items: CartItem[]): number => {
    return items.reduce((count, item) => count + item.quantity, 0);
};

export const FREE_SHIPPING_THRESHOLD = 120;
