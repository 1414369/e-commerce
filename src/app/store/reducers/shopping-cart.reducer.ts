import { EShoppingCartActions, ShoppingCartActions } from './../actions/shopping-cart.action';
import { initialShoppingCartState, iShoppingCartState } from '../state/shopping-cart.state';

export const shoppingCartReducers = (
    state = initialShoppingCartState,
    action: ShoppingCartActions
): iShoppingCartState => {
    switch (action.type) {
        case EShoppingCartActions.GetShoppingCartSuccess: {
            let shoppingCart = action.payload;

            const entities = shoppingCart.items.reduce((entities, item) => {
                return {
                    ...entities,
                    [item._id]: item,
                };
            }, {
                    ...state.entities
                });

            return {
                ...state,
                items: shoppingCart.items,
                entities,
            };
        }

        default:
            return state;
    }
};