import { createAction, props } from '@ngrx/store';

export const setIsLoggedIn = createAction(
  '[Auth] Set Is Logged In',
  props<{ isLoggedIn: boolean }>()
);
