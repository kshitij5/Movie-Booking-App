import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking';
import { URLs } from '../_shared/urls';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  getBookings(): Observable<any[]> {
    return this.http.get<any>(
      URLs.BOOKING_API_BASE_URL + '/all',
      this.httpOptions
    );
  }

  // getBookingById(id: string): Observable<Booking> {
  //   return this.http.get<Booking>(URLs.BOOKING_API_BASE_URL);
  // }

  getBookingByUserId(id: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(URLs.BOOKING_API_BASE_URL);
  }
  createBooking(booking: Booking) {
    return this.http.post<Booking>(
      URLs.BOOKING_API_BASE_URL + '/add',
      booking,
      this.httpOptions
    );
  }
  // createBookingWithData(booking: Booking) {
  //   return this.http.post<Booking>(URLs.BOOKING_API_BASE_URL, booking);
  // }
  constructor(private http: HttpClient) {}
}
