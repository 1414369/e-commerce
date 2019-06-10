import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
    GetShoppingCart,
    GetShoppingCartSucess,
    EShoppingCartActions,
} from '../actions/shopping-cart.action';
import { ShoppingCartService } from '@/_services';
import { ShoppingCartHttp } from '@/_models/http-models';

@Injectable()
export class ShoppingCartEffects {
    @Effect()
    getUsers$ = this.actions$.pipe(
        ofType<GetShoppingCart>(EShoppingCartActions.GetShoppingCart),
        switchMap(() => this.shoppingCartService.getCart()),
        switchMap((result: ShoppingCartHttp) =>
            of(new GetShoppingCartSucess(result)))
    );

    constructor(
        private shoppingCartService: ShoppingCartService,
        private actions$: Actions,
    ) { }
}