import { ShoppingCartItemHttp } from './shopping-cart-item';

export interface ShoppingCartHttp {
    _id: string;
    createdDate: Date;
    totalItemsCount: number;
    items: ShoppingCartItemHttp[];
}