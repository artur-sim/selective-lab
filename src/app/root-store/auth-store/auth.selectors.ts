import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const getToken = (state: fromAuth.AuthState) => state.token;
export const getError = (state: fromAuth.AuthState) => state.error;
export const getRegistrationResponse = (state: fromAuth.AuthState) => state.registrationResponse;

export const selectAuthState = createFeatureSelector<fromAuth.AuthState>(
    fromAuth.authFeatureKey
);

export const selectToken = createSelector(
    selectAuthState,
    getToken
);

export const selectIsLoggedIn = createSelector(
    selectToken,
    token => !!token
);

export const selectError = createSelector(
    selectAuthState,
    getError
);

export const selectRegistionResponse = createSelector(
    selectAuthState,
    getRegistrationResponse
);