import { ShoppingCartItem } from '@/_models';

export interface iShoppingCartState {
    _id: string;
    createdDate: Date;
    items: Array<ShoppingCartItem>
}

export const initialShoppingCartState: iShoppingCartState = {
    _id: "",
    createdDate: new Date(),
    items: [],
};