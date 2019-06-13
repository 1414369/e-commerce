import { ShoppingCartItemHttp } from './shopping-cart-item';

export interface OrderHttp {
    _id: string,
    user: string,
    items: ShoppingCartItemHttp[],
    createdDate: Date,
    shipping: shippingHttp,
}

export interface shippingHttp {
    name: string,
    adrress: string,
    adrress2: string,
    city: string,
}