import { ShoppingCartItemHttp } from '@/_models/http-models';

export interface iShoppingCartState {
    items: Array<ShoppingCartItemHttp>
    entities: { [id: string]: ShoppingCartItemHttp }
}

export const initialShoppingCartState: iShoppingCartState = {
    items: [],
    entities: {},
};