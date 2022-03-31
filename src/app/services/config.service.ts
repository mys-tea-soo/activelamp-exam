import { Injectable }                       from '@angular/core';
import { HttpClient }                       from '@angular/common/http';
import { HttpErrorResponse, HttpResponse }  from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError }      from 'rxjs/operators';


export interface Config {
  api     : string;
  textfile: string;
  date    : any;
}


@Injectable()

export class ConfigService {

  url = 'assets/config.json';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Config>(this.url)
              .pipe(
                catchError(this.handleError)
              );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
