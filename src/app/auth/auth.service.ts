import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRequest, ILoginResponse, ISignupRequest } from './auth.type';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const LOCAL_STORAGE_KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _signupUrl = `users/signup`;
  private _loginUrl = `auth/login`;

  constructor(private http: HttpClient, private router: Router) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  login(data: ILoginRequest): Observable<ILoginResponse> {
    return this.http
      .post<ILoginResponse>(
        this._loginUrl,
        {
          ...data,
        },
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  signup(data: ISignupRequest) {
    return this.http.post<any>(this._signupUrl, data);
  }

  signOut() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    this.router.navigate(['/']);
  }

  setTokenToLocalStorage(token: string) {
    localStorage.setItem(LOCAL_STORAGE_KEY, token);
  }

  getTokenFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEY);
  }

  loggedIn() {
    return !!this.getTokenFromLocalStorage();
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log({ errorMessage });
    return throwError(() => {
      return errorMessage;
    });
  }
}
