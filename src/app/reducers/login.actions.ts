import { createAction, props } from '@ngrx/store';

export const setToken = createAction(
  '[SetToken] Set Token',
  props<{ token: string }>()
);
