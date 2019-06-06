import { Product } from '@/_models';

export interface ShoppingCart {
    _id: string;
    createdDate: Date;
    totalItemsCount: number;
    products: ShoppingCartItem[];
}

export interface ShoppingCartItem {
    _id: string;
    quantity: number;
    product: Product;
}