import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse }  from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { FormService } from './form.service';
import { ServerResponseService } from 'src/app/services/server-response.service';
@Injectable({
  providedIn: 'root',
})
export class RequestService {

  api_url = 'http://localhost:8000/api/url'

  constructor(private http: HttpClient) { }

  get(): Observable<FormService> {
    return this.http.get<FormService>(this.api_url)
              .pipe(
                catchError(this.handleError)
              );
  }

  create(form: FormService): Observable<ServerResponseService> {
    return this.http.post<ServerResponseService>(this.api_url, form)
              .pipe(
                catchError(this.handleError)
              );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
