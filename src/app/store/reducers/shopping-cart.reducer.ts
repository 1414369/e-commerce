import { EShoppingCartActions, ShoppingCartActions } from './../actions/shopping-cart.action';
import { initialShoppingCartState, iShoppingCartState } from '../state/shopping-cart.state';

export const shoppingCartReducers = (
    state = initialShoppingCartState,
    action: ShoppingCartActions
): iShoppingCartState => {
    switch (action.type) {
        case EShoppingCartActions.GetShoppingCartSuccess: {
            let payload = action.payload;
            return {
                ...state,
                _id: payload._id,
                createdDate: payload.createdDate,
                items: payload.products,
            };
        }

        default:
            return state;
    }
};