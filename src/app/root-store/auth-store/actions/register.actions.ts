import { createAction, props } from "@ngrx/store";
import { RegistrationResponse } from "src/app/shared/models/auth/registration-response.model";

export const register = createAction(
    '[Register Component] Register',
    props<{ email: string, password: string }>()
);

export const registerSuccess = createAction(
    '[Auth API] Register Success',
    props<{ registrationResponse: RegistrationResponse }>()
);

export const registerFailure = createAction(
    '[Auth API] Register Failure',
    props<{ error: any }>()
);