import { Product } from '@/_models/';
export interface ShoppingCartItemHttp {
    _id: string;
    product: Product;
    quantity: number;
}