import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { authActions, authSelectors } from 'src/app/root-store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading = false;
  componentActive = true;
  $isLoggedIn: Observable<boolean>;
  errorMessage: string;
  
  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.store.select(authSelectors.selectIsLoggedIn)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(isLoggedIn => {
        this.isLoading = false;
        if (isLoggedIn) {
          this.route.navigate(['/dashboard']);
        }
      });

    this.store.select(authSelectors.selectError)
      .pipe(takeWhile(() => this.componentActive))
      .subscribe(errorMessage => {
        this.isLoading = false;
        this.errorMessage = errorMessage;
      });

    this.store.dispatch(authActions.LoginActions.clearSignInResponse());
  }

  ngOnDestroy() {
    this.componentActive = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

  login() {

    this.isLoading = true;
    if (this.loginForm.valid) {

      const credentials = { ...this.loginForm.value };

      this.store.dispatch(authActions.LoginActions.login({ email: credentials.email, password: credentials.password }));
    }
  }

}
