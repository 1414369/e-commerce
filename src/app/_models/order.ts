import { shippingHttp } from './http-models';

import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    public items;

    constructor(
        public user: string,
        items: ShoppingCartItem[],
        public shipping: shippingHttp,
    ) {
        this.items = items.map(item => {
            return {
                ...item,
                totalPrice: item.totalPrice,
            }
        });
    }
}
