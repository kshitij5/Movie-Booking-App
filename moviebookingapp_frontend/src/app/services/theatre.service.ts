import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Theatre } from '../models/theatre';
import { URLs } from '../_shared/urls';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root',
})
export class TheatreService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAllTheatres(): Observable<Theatre[]> {
    return this.httpClient.get<Theatre[]>(URLs.THEATRE_API_BASE_URL + '/all');
    pipe(catchError(this.handleError));
  }

  deleteTheatre(TheatreId: number): Observable<Theatre> {
    return this.httpClient
      .delete<Theatre>(URLs.THEATRE_API_BASE_URL + '/delete/' + TheatreId)
      .pipe(catchError(this.handleError));
  }

  addTheatre(theatre: any): Observable<any> {
    return this.httpClient
      .post<Theatre>(
        URLs.THEATRE_API_BASE_URL + '/add',
        JSON.stringify(theatre),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateTheatre(theatre: any): Observable<any> {
    console.log(theatre);
    return this.httpClient
      .put<Theatre>(
        URLs.THEATRE_API_BASE_URL + '/update',
        JSON.stringify(theatre),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  findTheatre(id: any): Observable<Theatre> {
    return this.httpClient
      .get<Theatre>(URLs.THEATRE_API_BASE_URL + '/searchByTheatre/' + id)
      .pipe(catchError(this.handleError));
  }

  // http://localhost:8080/api/v1.0/moviebooking/shows/searchByMovie/KKBKKJ
  findTheatresbyMovie(movieId: any): Observable<Show[]> {
    return this.httpClient
      .get<Show[]>(
        URLs.SHOW_API_BASE_URL + '/searchByMovieId/' + movieId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  handleError(eResponse: HttpErrorResponse) {
    if (eResponse.error instanceof ErrorEvent) {
      console.log('Client Side Error =' + eResponse.error.message);
      console.log('Status Code=' + eResponse.status);
    } else {
      console.log('Server Side Error =' + eResponse.error.message);
      console.log('Status Code=' + eResponse.status);
    }
    return throwError(eResponse.error.message);
  }
}
