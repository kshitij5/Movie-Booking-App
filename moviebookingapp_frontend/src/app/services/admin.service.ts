import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLs } from '../_shared/urls';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public addToShow(value: any): Observable<any> {
    console.log(value);
    return this.http.get(
      URLs.SHOW_API_BASE_URL + '/map/' + value.movieId + '/' + value.showId,
      httpOptions
    );
  }
}
