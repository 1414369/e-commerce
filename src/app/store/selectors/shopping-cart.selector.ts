import { createSelector } from '@ngrx/store';

import { iAppState } from '../state';
import { iShoppingCartState } from '../state/shopping-cart.state';
import { instantiateSupportedAnimationDriver } from '@angular/platform-browser/animations/src/providers';

const selectShoppingCart = (state: iAppState) => state.shoppingCart;

export const sShoppingCartItems = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState) => state.items
);

export const sShoppingCartTotalItems = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState) => {
        return state.items.reduce((totalItems, item) => {
            return totalItems + item.quantity;
        }, 0)
    }
);

