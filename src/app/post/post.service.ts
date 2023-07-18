import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IPostRequest, IPostResponse } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  apiURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPosts(): Observable<Array<IPostResponse>> {
    return this.http
      .get<Array<IPostResponse>>(this.apiURL + '/posts')
      .pipe(retry(0), catchError(this.handleError));
  }

  getPost(id: number): Observable<IPostResponse> {
    return this.http
      .get<IPostResponse>(this.apiURL + `/posts/${id}`)
      .pipe(retry(0), catchError(this.handleError));
  }

  createPost(post: IPostRequest): Observable<IPostResponse> {
    return this.http
      .post<IPostResponse>(
        this.apiURL + '/posts',
        {
          ...post,
        },
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  updatePost(id: number, post: IPostRequest): Observable<IPostResponse> {
    return this.http
      .put<IPostResponse>(
        this.apiURL + `/posts/${id}`,
        { ...post },
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  deletePost(id: number) {
    return this.http
      .delete<IPostResponse>(this.apiURL + `/posts/${id}`, this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
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
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
