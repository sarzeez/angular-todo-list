import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  ILoginRequest,
  ILoginResponse,
  ISignupRequest,
  JwtPayload,
  Session,
} from './auth.type';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';

const LOCAL_STORAGE_KEY = 'session';

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

  loggedIn() {
    return !!this.getSession();
  }

  getSession(): Session | null {
    const session = localStorage.getItem(LOCAL_STORAGE_KEY);
    return session ? JSON.parse(session) : null;
  }

  setSession(token: string) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    const session: Session = {
      accessToken: token,
      user: {
        id: decodedToken.id,
        firstname: decodedToken.firstname,
        email: decodedToken.email,
        role: decodedToken.role,
      },
      accessTokenExpires: decodedToken.exp * 1000,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
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
