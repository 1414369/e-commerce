import { ShoppingCartItemHttp } from '@/_models/http-models';

export interface iShoppingCartState {
    entities: { [id: string]: ShoppingCartItemHttp }
}

export const initialShoppingCartState: iShoppingCartState = {
    entities: {},
};