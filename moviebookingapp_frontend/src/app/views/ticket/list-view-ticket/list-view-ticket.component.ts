import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-list-view-ticket',
  templateUrl: './list-view-ticket.component.html',
  styleUrls: ['./list-view-ticket.component.css'],
})
export class ListViewTicketComponent implements OnInit {
  bookings: Booking[] = [];
  userId: any;

  constructor(
    private bookingService: BookingService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.getBookings(this.userId);
  }

  getBookings(userId: string) {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
    });
  }


}
