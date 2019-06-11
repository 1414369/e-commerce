import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import {
    GetShoppingCart,
    GetShoppingCartSucess,
    EShoppingCartActions,
    AddToCart,
    AddToCartSuccess,
    RemoveFromCart,
    RemoveFromCartSuccess,
    ClearCartSuccess
} from '../actions/shopping-cart.action';
import { ShoppingCartService } from '@/_services';
import { ShoppingCartHttp, ShoppingCartItemHttp } from '@/_models/http-models';

@Injectable()
export class ShoppingCartEffects {
    @Effect()
    getShoppingCart$ = this.actions$.pipe(
        ofType<GetShoppingCart>(EShoppingCartActions.GetShoppingCart),
        switchMap(() => this.shoppingCartService.getCart()),
        switchMap((result: ShoppingCartHttp) =>
            of(new GetShoppingCartSucess(result)))
    );

    @Effect()
    addToCart$ = this.actions$.pipe(
        ofType<AddToCart>(EShoppingCartActions.AddToCart),
        map(action => action.payload),
        switchMap((product) => this.shoppingCartService.add(product)),
        switchMap((result: ShoppingCartItemHttp) =>
            of(new AddToCartSuccess(result)))
    );

    @Effect()
    removeFromCart$ = this.actions$.pipe(
        ofType<RemoveFromCart>(EShoppingCartActions.RemoveFromCart),
        map(action => action.payload),
        switchMap((product) => this.shoppingCartService.remove(product)),
        switchMap((result: ShoppingCartItemHttp) =>
            of(new RemoveFromCartSuccess(result)))
    );

    @Effect()
    clearCart$ = this.actions$.pipe(
        ofType<ClearCartSuccess>(EShoppingCartActions.ClearCart),
        switchMap(() => this.shoppingCartService.clearCart()),
        switchMap((result: ShoppingCartHttp) =>
            of(new ClearCartSuccess()))
    );

    constructor(
        private shoppingCartService: ShoppingCartService,
        private actions$: Actions,
    ) { }
}