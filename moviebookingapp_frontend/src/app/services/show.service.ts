import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, catchError, throwError } from 'rxjs';
import { Show } from '../models/show';
import { Theatre } from '../models/theatre';
import { URLs } from '../_shared/urls';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  updateTicketStatus(selectedShow: Show): Observable<Show[]> {
    console.log(URLs.SHOW_API_BASE_URL + '/all');
    return this.httpClient.get<Show[]>(
      URLs.SHOW_API_BASE_URL +
        '/updateTicket/' +
        selectedShow.showId +
        '/' +
        selectedShow.ticketStatus
    );
    pipe(catchError(this.handleError));
  }
  constructor(private httpClient: HttpClient) {}

  getAllShows(): Observable<Show[]> {
    console.log(URLs.SHOW_API_BASE_URL + '/all');
    return this.httpClient.get<Show[]>(URLs.SHOW_API_BASE_URL + '/all');
    pipe(catchError(this.handleError));
  }

  getShowsByTheatreId(theatreId: string): Observable<Show[]> {
    console.log(URLs.SHOW_API_BASE_URL + '/searchByTheatreId/' + theatreId);
    return this.httpClient.get<Show[]>(
      URLs.SHOW_API_BASE_URL + '/searchByTheatreId/' + theatreId
    );
    pipe(catchError(this.handleError));
  }

  getShowsByShowId(showID: string): Observable<Show> {
    console.log(URLs.SHOW_API_BASE_URL + '/searchByShowId/' + showID);
    return this.httpClient.get<Show>(
      URLs.SHOW_API_BASE_URL + '/searchByShowId/' + showID
    );
    pipe(catchError(this.handleError));
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
