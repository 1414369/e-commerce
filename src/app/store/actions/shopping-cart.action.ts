import { ShoppingCart } from '@/_models';

import { Action } from '@ngrx/store';

export enum EShoppingCartActions {
    GetShoppingCart = '[ShoppingCart] Get ShoppingCart',
    GetShoppingCartSuccess = '[ShoppingCart] Get ShoppingCart Success',
}

export class GetShoppingCart implements Action {
    public readonly type = EShoppingCartActions.GetShoppingCart;
}

export class GetShoppingCartSucess implements Action {
    public readonly type = EShoppingCartActions.GetShoppingCartSuccess;
    constructor(
        public payload: ShoppingCart
    ) {
    }
}

export type ShoppingCartActions = GetShoppingCart | GetShoppingCartSucess;