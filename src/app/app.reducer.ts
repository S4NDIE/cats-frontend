import { ActionReducerMap } from '@ngrx/store';
import * as login from './reducers/login.reducer';

export interface AppState {
  login: login.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  login: login.loginReducer,
}
