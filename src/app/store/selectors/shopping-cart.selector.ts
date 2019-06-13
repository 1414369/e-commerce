import { createSelector } from '@ngrx/store';

import { iAppState } from '../state';
import { iShoppingCartState } from '../state/shopping-cart.state';
import { ShoppingCart } from '@/_models';

const selectShoppingCart = (state: iAppState) => state.shoppingCart;

export const sShoppingCart = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState) =>  {
        return new ShoppingCart(state.entities);
    }
);

export const sGetCartItems = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState) => {
        let shoppingCart = new ShoppingCart(state.entities);
        return shoppingCart.items;
    }
);
