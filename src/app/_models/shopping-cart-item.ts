import { Product } from './Product';

export class ShoppingCartItem {

    constructor(public product: Product, public quantity: number) {

    }

    public get totalPrice() {
        return this.product.price * this.quantity;
    };
}
