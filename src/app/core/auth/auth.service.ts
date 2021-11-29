import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { LoginResponse } from 'src/app/shared/models/auth/login-response.model';
import { RegistrationResponse } from 'src/app/shared/models/auth/registration-response.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<LoginResponse> {

    const url = `${this.baseUrl}/connect/token`;
    const payload = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    return this.http.post<LoginResponse>(url, payload)
      .pipe(catchError(this.handleError));
  }

  register(email: string, password: string): Observable<RegistrationResponse> {

    const url = `${this.baseUrl}/register`;
    const payload = {
      companyId: '002AB8BB-0389-4A6A-BC60-98B00319C864',
      email: email,
      password: password
    };

    return this.http.post<RegistrationResponse>(url, payload);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err instanceof HttpErrorResponse) {

      switch (err.status) {

        case 401: 
          errorMessage = 'Invalid username or password';
        break;

        default:
          errorMessage = `Backend returned code ${err.status}: ${err.message}`;
      }
    } else {

      errorMessage = `An error occurred: ${err.error.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
