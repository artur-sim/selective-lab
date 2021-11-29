import { createReducer, on, Action } from '@ngrx/store';
import { RegistrationResponse } from 'src/app/shared/models/auth/registration-response.model';
import { authActions } from './actions';

export const authFeatureKey = 'auth';

export interface AuthState {
    token: string;
    registrationResponse: RegistrationResponse | null;
    error: string;
};

export const initialState: AuthState = {
    token: '',
    registrationResponse: null,
    error: ''
};

const authReducer = createReducer(
    initialState,
    on(authActions.LoginActions.login, (state, action) => (
        {
            ...state,
            error: ''
        }
    )),
    on(authActions.LoginActions.loginSuccess, (state, action) => (
        {
            ...state,
            token: action.token,
            error: ''
        }
    )),
    on(authActions.RegisterActions.registerSuccess, (state, action) => (
        {
            ...state,
            registrationResponse: action.registrationResponse,
            error: ''
        }
    )),
    on(authActions.LoginActions.clearSignInResponse, (state, action) => (
        {
            ...state,
            registrationResponse: null
        }
    )),
    on(authActions.LoginActions.loginFailure,
       authActions.RegisterActions.registerFailure, (state, action) => (
        {
            ...state,
            token: '',
            registrationResponse: null,
            error: action.error
        }
    ))
);

export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
}