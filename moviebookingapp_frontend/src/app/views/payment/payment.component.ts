import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Payment } from 'src/app/models/payment';
import { Show } from 'src/app/models/show';
import { BookingService } from 'src/app/services/booking.service';
import { MovieService } from 'src/app/services/movie.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ShowService } from 'src/app/services/show.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  ngOnInit(): void {
  }
}
