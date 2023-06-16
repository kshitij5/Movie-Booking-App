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
  selector: 'app-detail-view-payment',
  templateUrl: './detail-view-payment.component.html',
  styleUrls: ['./detail-view-payment.component.css'],
})
export class DetailViewPaymentComponent implements OnInit {
  showID!: string;
  MovieID!: string;
  BookingID!: string;
  PaymentID!: string;
  Movie!: Movie;
  Payment!: Payment;
  Show!: Show;
  constructor(
    private route: ActivatedRoute,
    private movieContext: MovieService,
    private showContext: ShowService,
    private bookingContext: BookingService,
    private paymentContext: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.showID = params['showID'];
      this.MovieID = params['movieID'];
      this.BookingID = params['bookingID'];
      this.PaymentID = params['ticketID'];
    });
    console.log(this.showID, this.MovieID, this.BookingID);
    this.getMovie();
    this.getPayment();
    this.getShow();
  }

  getShow() {
    this.showContext.getShowsByShowId(this.showID).subscribe((showResult) => {
      this.Show = showResult;
    });
  }

  getMovie() {
    this.movieContext.getMovieById(this.MovieID).subscribe((movieResult) => {
      this.Movie = movieResult;
      console.log(movieResult);
    });
  }
  getPayment() {
    this.paymentContext
      .getPaymentById(this.PaymentID)
      .subscribe((paymentResult) => {
        this.Payment = paymentResult;
      });
  }

  onPay() {}
}
