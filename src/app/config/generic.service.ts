import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResourceModel } from './generic.model';

let baseUrl = 'http://localhost:3000/api';

export abstract class GenericService<T extends ResourceModel<T>> {
  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new (m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string
  ) {}

  public create<C>(resource: Partial<T>): Observable<T> {
    return this.httpClient.post<T>(`${baseUrl}${this.apiUrl}`, resource).pipe(
      map((result) => new this.tConstructor(result)),
      catchError(this.handleError)
    );
  }

  public get(): Observable<T[]> {
    return this.httpClient.get<T[]>(`${baseUrl}${this.apiUrl}`).pipe(
      map((result) => result.map((i) => new this.tConstructor(i))),
      catchError(this.handleError)
    );
  }

  public getById(id: number): Observable<T> {
    return this.httpClient.get<T>(`${baseUrl}${this.apiUrl}/${id}`).pipe(
      map((result) => new this.tConstructor(result)),
      catchError(this.handleError)
    );
  }

  public update(resource: Partial<T>): Observable<T> {
    const { id, ...data } = resource;
    return this.httpClient
      .put<T>(`${baseUrl}${this.apiUrl}/${resource.id}`, data)
      .pipe(
        map((result) => new this.tConstructor(result)),
        catchError(this.handleError)
      );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${baseUrl}${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  public handleError(error: any) {
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
