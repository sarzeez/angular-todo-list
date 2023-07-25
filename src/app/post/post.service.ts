import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { IPostRequest, IPostResponse } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getPosts(): Observable<Array<IPostResponse>> {
    return this.http
      .get<Array<IPostResponse>>('posts')
      .pipe(retry(0), catchError(this.handleError));
  }

  getPost(id: number): Observable<IPostResponse> {
    return this.http
      .get<IPostResponse>(`posts/${id}`)
      .pipe(retry(0), catchError(this.handleError));
  }

  createPost(post: IPostRequest): Observable<IPostResponse> {
    return this.http
      .post<IPostResponse>(
        'posts',
        {
          ...post,
        },
        this.httpOptions
      )
      .pipe(retry(0), catchError(this.handleError));
  }

  updatePost(id: number, post: IPostRequest): Observable<IPostResponse> {
    return this.http
      .put<IPostResponse>(`posts/${id}`, { ...post }, this.httpOptions)
      .pipe(retry(0), catchError(this.handleError));
  }

  deletePost(id: number) {
    return this.http
      .delete<IPostResponse>(`posts/${id}`, this.httpOptions)
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
