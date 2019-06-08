import { Product } from '@/_models';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    _id: string;
    createdDate: Date;
    totalItemsCount: number;
    public items: ShoppingCartItem[] = [];

    constructor(public products, ) {
        products.forEach(p => {
            this.items.push(new ShoppingCartItem(p));
        })
    }

    getQuantity(product: Product) {
        let foundProduct: ShoppingCartItem = this.products.find(p => {
            return p._id === product._id
        })

        if (!foundProduct) return 0;

        return foundProduct.quantity;
    }

    get totalPrice() {
        return this.items.reduce((total, curItem) => {
            return total + curItem.totalPrice;
        }, 0)
    }
}
