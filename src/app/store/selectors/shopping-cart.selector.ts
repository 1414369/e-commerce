import { createSelector } from '@ngrx/store';

import { iAppState } from '../state';
import { iShoppingCartState } from '../state/shopping-cart.state';
import { instantiateSupportedAnimationDriver } from '@angular/platform-browser/animations/src/providers';
import { ShoppingCart } from '@/_models';

const selectShoppingCart = (state: iAppState) => state.shoppingCart;

export const sShoppingCart = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState) => {
        return new ShoppingCart(state.entities);
    }
);

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

export const sShoppingCartItemsQuantity = createSelector(
    selectShoppingCart,
    (state: iShoppingCartState, props: { itemId: string }) => {
        let item = state.items.find(i => {
            return i._id === props.itemId;
        })

        return item.quantity;
    }
);