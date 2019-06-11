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

            entities[product._id] = product;

            return {
                ...state,
                entities,
            };
        }

        case EShoppingCartActions.RemoveFromCartSuccess: {
            const product = action.payload;

            let entities = { ...state.entities };

            if (product.quantity > 0) {
                entities[product._id] = product;
            } else {
                let { [product._id]: any, ...newEntities } = entities;
                entities = { ...newEntities };
            }

            return {
                ...state,
                entities,
            };
        }

        case EShoppingCartActions.ClearCartSuccess: {
            let entities = {};

            return {
                ...state,
                entities,
            };
        }

        default:
            return state;
    }
};