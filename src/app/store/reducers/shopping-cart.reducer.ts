import { EShoppingCartActions, ShoppingCartActions } from './../actions/shopping-cart.action';
import { initialShoppingCartState, iShoppingCartState } from '../state/shopping-cart.state';

export const shoppingCartReducers = (
    state = initialShoppingCartState,
    action: ShoppingCartActions
): iShoppingCartState => {
    switch (action.type) {
        case EShoppingCartActions.GetShoppingCartSuccess: {
            const shoppingCart = action.payload;

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
                entities,
            };
        }

        case EShoppingCartActions.AddToCartSuccess: {
            const product = action.payload;

            const entities = { ...state.entities };
            // if(!entities[product._id]){
            //     entities[product._id] = product;
            // }

            // entities[product._id].quantity = product.quantity;

            entities[product._id] = product;

            return {
                ...state,
                entities,
            };
        }

        // case EShoppingCartActions.RemoveFromCartSuccess: {
        //     let shoppingCart = action.payload;

        //     return {
        //         ...state,
        //         items: shoppingCart.items,
        //         entities,
        //     };
        // }

        default:
            return state;
    }
};