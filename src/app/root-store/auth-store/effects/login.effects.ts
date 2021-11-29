import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map } from "rxjs/operators";
import { AuthService } from "src/app/core/auth/auth.service";
import { authActions } from "../actions";

@Injectable()
export class LoginEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router
    ) { }

    login$ = createEffect(() => 
        this.actions$.pipe(
            ofType(authActions.LoginActions.login),
            exhaustMap(action =>
                this.authService.login(action.email, action.password).pipe(
                    map(loginResponse => authActions.LoginActions.loginSuccess({ token: loginResponse.access_token })),
                    catchError(error => of(authActions.LoginActions.loginFailure({ error })))
                )
            )
        )
    );
}