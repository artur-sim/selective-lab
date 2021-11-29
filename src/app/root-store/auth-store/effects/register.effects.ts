import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { authActions } from "../actions";

@Injectable()
export class RegisterEffects {
    constructor(
        private action$: Actions,
        private authService: AuthService
    ) {}

    register$ = createEffect(() =>
        this.action$.pipe(
            ofType(authActions.RegisterActions.register),
            exhaustMap(action =>
                this.authService.register(action.email, action.password).pipe(
                    map(registrationResponse => authActions.RegisterActions.registerSuccess({ registrationResponse })),
                    catchError((error) => of(authActions.RegisterActions.registerFailure({ error })))
                )
            )
        )
    );
}