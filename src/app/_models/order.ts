import { Product } from '@/_models';
import { ShoppingCartItem } from './shopping-cart-item';
import { OrderHttp, shippingHttp } from './http-models';

export class Order {
    _id: string;
    items: ShoppingCartItem[] = [];
    user: string;
    createdDate: Date;
    shipping: shippingHttp;

    constructor(private order: OrderHttp) {
        for (let item of this.order.items) {
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }

        this._id = this.order._id;
        this.user = this.order.user;
        this.createdDate = this.order.createdDate;
        this.shipping = this.order.shipping;
    }

    get totalItemsQuantity() {
        let count = 0;

        for (let item of this.order.items) {
            count += item.quantity;
        }
        return count;
    }

    get totalPrice() {
        return this.items.reduce((total, curItem) => {
            return total + curItem.totalPrice;
        }, 0)
    }
}