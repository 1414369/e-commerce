import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { iAppState } from '../state/index'
import { shoppingCartReducers } from './shopping-cart.reducer';

export const reducers: ActionReducerMap<iAppState> = {
  shoppingCart: shoppingCartReducers,
};


export const metaReducers: MetaReducer<iAppState>[] = !environment.production ? [] : [];
