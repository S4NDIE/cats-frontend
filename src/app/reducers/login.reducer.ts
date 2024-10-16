import { Action, createReducer, on } from '@ngrx/store';
import * as loginActions from './login.actions';

export interface State {
  token: string | null;
}

export const initialState: State = {
  token: null
}

const _loginReducer = createReducer(
  initialState,
  on(loginActions.setToken, (state, { token }) => ({
    ...state,
    token
  }))
);

export function loginReducer(state: State | undefined, action: Action) {
  return _loginReducer(state, action);
}
