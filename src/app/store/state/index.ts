
import { iShoppingCartState, initialShoppingCartState } from './shopping-cart.state';

export interface iAppState {
    shoppingCart: iShoppingCartState;
}

export const initialAppState: iAppState = {
    shoppingCart: initialShoppingCartState,
};

export function getInitialState(): iAppState {
    return initialAppState;
}