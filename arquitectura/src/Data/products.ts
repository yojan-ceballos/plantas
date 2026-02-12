export interface Product {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    category: string;
    careLevel: string;
    size: 'S' | 'M' | 'L' | 'XL';
    description: string;
    image: string;
    images?: string[];
    tag?: 'Best Seller' | 'Sale' | 'New';
    isNew?: boolean;
    stock: number;
}


