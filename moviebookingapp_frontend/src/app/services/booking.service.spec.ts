import { TestBed } from '@angular/core/testing';

import { Booking } from '../models/booking';
import { BookingService } from './booking.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { URLs } from '../_shared/urls';

describe('BookingService', () => {
  let bookingService: BookingService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookingService],
    });
    bookingService = TestBed.inject(BookingService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(bookingService).toBeTruthy();
  });

  it('should get all bookings', () => {
    bookingService.getBookings().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.BOOKING_API_BASE_URL + '/all'
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('should get booking by Id', () => {
    let userId = 'user';
    bookingService.getBookingByUserId(userId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(URLs.BOOKING_API_BASE_URL);
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('should create booking', () => {
    const booking = {};
    bookingService.createBooking(booking as Booking).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.BOOKING_API_BASE_URL + '/add'
    );
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response
  });
});
