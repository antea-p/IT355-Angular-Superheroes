import { createReducer, on, Action } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn?: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: undefined
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.setIsLoggedIn, (state, { isLoggedIn }) => ({ ...state, isLoggedIn }))
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
