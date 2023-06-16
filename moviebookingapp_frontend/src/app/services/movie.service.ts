import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { catchError } from 'rxjs/operators';
import { URLs } from '../_shared/urls';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<Movie[]>(URLs.MOVIES_API_BASE_URL + '/all', this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteMovie(movieId: number, movieName: string): Observable<Movie> {
    return this.httpClient
      .delete<Movie>(
        URLs.MOVIES_API_BASE_URL + movieName + '/delete/' + movieId,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  addMovie(movie: any): Observable<any> {
    return this.httpClient
      .post<Movie>(
        URLs.MOVIES_API_BASE_URL + '/add',
        JSON.stringify(movie),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateMovie(movie: any): Observable<any> {
    console.log(movie);
    return this.httpClient
      .put<Movie>(
        URLs.MOVIES_API_BASE_URL + '/update',
        JSON.stringify(movie),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  // addMovieToShow(mvee: any, showId: number): Observable<any> {
  //   console.log(mvee);
  //   return this.httpClient
  //     .put<Movie>(
  //       URLs.MOVIES_API_BASE_URL + '/movies/map?showId=' + showId,
  //       JSON.stringify(mvee),
  //       this.httpOptions
  //     )
  //     .pipe(catchError(this.handleError));
  // }

  getMovieById(id: any): Observable<Movie> {
    return this.httpClient
      .get<Movie>(URLs.MOVIES_API_BASE_URL + '/view/' + id)
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
