import { ShoppingCartHttp, ShoppingCartItemHttp } from '@/_models/http-models';

import { Action } from '@ngrx/store';
import { Product } from '@/_models';

export enum EShoppingCartActions {
    GetShoppingCart = '[ShoppingCart] Get ShoppingCart',
    GetShoppingCartSuccess = '[ShoppingCart] Get ShoppingCart Success',
    AddToCart = '[ShoppingCart] Add ShoppingCart',
    AddToCartSuccess = '[ShoppingCart] Add ShoppingCart Success',
    RemoveFromCart = '[ShoppingCart] Remove ShoppingCart',
    RemoveFromCartSuccess = '[ShoppingCart] Remove ShoppingCart Success',
    ClearCart = '[ShoppingCart] Clear ShoppingCart',
    ClearCartSuccess = '[ShoppingCart] Clear ShoppingCart Success',

}

export class GetShoppingCart implements Action {
    public readonly type = EShoppingCartActions.GetShoppingCart;
}


export class GetShoppingCartSucess implements Action {
    public readonly type = EShoppingCartActions.GetShoppingCartSuccess;
    constructor(
        public payload: ShoppingCartHttp
    ) {
    }
}

export class AddToCart implements Action {
    public readonly type = EShoppingCartActions.AddToCart;
    constructor(public payload: Product) { }
}

export class AddToCartSuccess implements Action {
    public readonly type = EShoppingCartActions.AddToCartSuccess;
    constructor(
        public payload: ShoppingCartItemHttp
    ) {
    }
}

export class RemoveFromCart implements Action {
    public readonly type = EShoppingCartActions.RemoveFromCart;
    constructor(public payload: Product) { }
}

export class RemoveFromCartSuccess implements Action {
    public readonly type = EShoppingCartActions.RemoveFromCartSuccess;
    constructor(
        public payload: ShoppingCartItemHttp
    ) {
    }
}

export class ClearCart implements Action {
    public readonly type = EShoppingCartActions.ClearCart;
}

export class ClearCartSuccess implements Action {
    public readonly type = EShoppingCartActions.ClearCartSuccess;
}

export type ShoppingCartActions =
    GetShoppingCart |
    GetShoppingCartSucess |
    AddToCart |
    AddToCartSuccess |
    RemoveFromCart |
    RemoveFromCartSuccess |
    ClearCart |
    ClearCartSuccess;