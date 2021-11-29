import { createAction, props } from '@ngrx/store';

export const login = createAction(
    '[Login Component] Login',
    props<{ email: string, password: string}>()
);

export const loginSuccess = createAction(
    '[Auth API] Login Success',
    props<{ token: string }>()
);

export const loginFailure = createAction(
    '[Auth API] Login Failure',
    props<{ error: any }>()
);

export const clearSignInResponse = createAction(
    '[Login Component] Clear Sign In Response'
);