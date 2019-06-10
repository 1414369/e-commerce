import { Product } from '@/_models';
import { ShoppingCartItem } from './shopping-cart-item';
import { ShoppingCartItemHttp } from './http-models';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(public itemsMap: { [id: string]: ShoppingCartItemHttp }, ) {
        for (let itemId in itemsMap) {
            let item = itemsMap[itemId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

    get totalItemsQuantity() {
        let count = 0;
        for (let itemId in this.itemsMap) {
            count += this.itemsMap[itemId].quantity;
        }

        return count;
    }

    getQuantity(product: Product) {
        let item = this.itemsMap[product._id];
        if (!item) return 0;

        return item.quantity;
    }

    // get totalPrice() {
    //     return this.items.reduce((total, curItem) => {
    //         return total + curItem.totalPrice;
    //     }, 0)
    // }
}