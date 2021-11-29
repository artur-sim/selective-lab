import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/shared/validators/must-match.validator';
import { authActions, authSelectors } from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RegistrationResponse } from 'src/app/shared/models/auth/registration-response.model';
import { Router } from '@angular/router';
import { createPasswordStrengthValidator } from 'src/app/shared/validators/create-password-strength.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isLoading: boolean = false;
  registrationResponse$: Observable<RegistrationResponse>;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private route: Router
  ) { }

  get password() {
    return this.registerForm.get('password');
  }

  get hasUpperCase() {

    if (!this.password?.dirty)
      return true;
    
    if (!this.password?.errors?.passwordStrength)
      return this.password?.errors?.required;

    return this.password?.errors?.passwordStrength?.hasUpperCase;
  }

  get hasLowerCase() {

    if (!this.password?.dirty)
      return true;
    
    if (!this.password?.errors?.passwordStrength)
      return this.password?.errors?.required;

    return this.password?.errors?.passwordStrength?.hasLowerCase;
  }

  get hasNumeric() {

    if (!this.password?.dirty)
      return true;
    
    if (!this.password?.errors?.passwordStrength)
      return this.password?.errors?.required;

    return this.password?.errors?.passwordStrength?.hasNumeric;
  }

  get hasNonAlphaNumeric() {

    if (!this.password?.dirty)
      return true;
    
    if (!this.password?.errors?.passwordStrength)
      return this.password?.errors?.required;

    return this.password?.errors?.passwordStrength?.hasNonAlphaNumeric;
  }

  get hasMinLength() {

    if (!this.password?.dirty)
      return true;

    if (this.password?.errors?.required)
      return true;

    return this.password?.errors?.minlength;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), createPasswordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: mustMatch('password', 'confirmPassword')
    }); 

    this.store.select(authSelectors.selectRegistionResponse)
      .subscribe(registrationResponse => {
        this.isLoading = false;

        if (registrationResponse && !registrationResponse.hasError) {
          this.route.navigate(['/login']);
        }
      });
  }
  
  hasError(controlName: string, errorName: string) {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  register() {

    this.isLoading = true;

    if (this.registerForm.valid) {
      const credentials = { ...this.registerForm.value };

      this.store.dispatch(authActions.RegisterActions.register({ email: credentials.email, password: credentials.password }));
    }
  }
}
