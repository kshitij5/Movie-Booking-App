import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from 'src/app/models/booking';
import { Movie } from 'src/app/models/movie';
import { Seat } from 'src/app/models/seat';
import { Theatre } from 'src/app/models/theatre';
import { User } from 'src/app/models/user';
import { BookingService } from 'src/app/services/booking.service';
import { HallService } from 'src/app/services/hall.service';
import { MovieService } from 'src/app/services/movie.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ShowService } from 'src/app/services/show.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-detail-view-hall',
  templateUrl: './detail-view-hall.component.html',
  styleUrls: ['./detail-view-hall.component.css'],
})
export class DetailViewHallComponent implements OnInit {
  public hallId: any;
  public seats: any = [];
  public show: any;
  row: number = 0;
  col: number = 0;
  errorMessage = '';
  totalTicketPrice = 0;
  selected: boolean = false;
  selectedSeat: any;
  storedSeat!: Seat[];
  booking!: Booking;
  movie!: Movie;
  avialableSeat = 0;
  payment!: any;
  paymentID!: string;
  normalTicket = 1;
  user!: User;
  public showId: any;

  demo = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18, 19, 20, 21, 22, 23];

  constructor(
    private showService: ShowService,
    private hallService: HallService,
    private movieService: MovieService,
    private userService: TokenStorageService,
    private router: Router,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.hallId = this.route.snapshot.paramMap.get('hallId');
    this.showId = this.route.snapshot.paramMap.get('showId');
    this.totalTicketPrice = 0;
    this.getHall();
    this.getShow();
    this.checkIfselectedLocalStorage();
  }

  getHall(): any {
    return this.hallService.getHallById(this.hallId).subscribe(
      (hall) => {
        this.seats = hall.seats;
        this.row = hall.rowNumer;
        this.col = hall.columnNumer;
        console.log(this.seats);
      },
      (err: { error: { message: string } }) => {
        this.errorMessage = err.error.message;
      }
    );
  }

  getShow() {
    this.showService.getShowsByShowId(this.showId).subscribe((data) => {
      this.show = data;
      this.getMovies(this.show.movie.movieId);
    });
  }

  getMovies(movieId: string) {
    this.movieService.getMovieById(movieId).subscribe((data) => {
      this.movie = data;
      console.log(data);
    });
  }

  convertMinuteToHour(minute: number) {
    var hours = Math.floor(minute / 60);
    var minutes = minute % 60;
    var duration = hours + ' H : ' + minutes + 'M';
    return duration;
  }

  onBooking() {
    if (this.user) {
      var savedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
      this.storedSeat = savedSeats;

      if (this.normalTicket > 0 && this.storedSeat.length > 0) {
        var todayDate = new Date();
        var newbooking = (this.booking = {
          bookingStatus: 'BOOKED',
          timeStamp: todayDate,
          userId: this.user.loginId,
          noOfTickets: this.normalTicket,
          totalCost: this.totalTicketPrice,
          movie: this.movie,
          hallId: this.hallId,
          ticket: [],
        });

        // todo create tickets

        console.log(this.booking);

        this.bookingService
          .createBooking(newbooking)
          .subscribe((bookingresult) => {
            console.log(bookingresult);
            // for (var i = 0; i < this.storedSeat.length; i++) {
            //   this.storedSeat[i].bookingId = bookingresult.bookingId;
            //   this.storedSeat[i].status = 'BOOKED';

            //todo after booking is done, update seat status to booked
            // this is handled from backend

            // this.hallService
            //   .updateShowSeat(
            //     this.storedSeat[i].showSeatID,
            //     this.storedSeat[i]
            //   )
            //   .subscribe();
            // }
            this.onPayment(bookingresult.bookingId!);
          });
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  onPayment(bookingID: string) {
    var totalPrice = this.totalTicketPrice;
    var newPayment = (this.payment = {
      amount: totalPrice,
      timeStamp: new Date(),
      // paymentMethod: 1,
      bookingID: bookingID,
      // discountCuponID: 0,
    });

    this.paymentService.createPayment(newPayment).subscribe(
      (paymentResult) => {
        console.log('payment' + JSON.stringify(paymentResult));


        
        this.paymentID = paymentResult.paymentID!;
        this.router.navigate([
          'payment/movie',
          this.movie.movieId,
          'show',
          this.showId,
          'booking',
          bookingID,
          'ticket',
          this.paymentID,
        ]);
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    );
  }

  checkIfselectedLocalStorage() {
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
    if (storedSeats !== null && storedSeats.length > 0) {
      for (var i = 0; i < storedSeats.length; i++) {
        storedSeats.splice(i, 2);
        localStorage.setItem('SelectedSeats', JSON.stringify(storedSeats));

        console.log(storedSeats[i]);
      }
    }
  }

  onSelected(seat: any) {
    var storedSeats = JSON.parse(localStorage.getItem('SelectedSeats')!) || [];
    // console.log(storedSeats);
    // if (seat.status == 'AVAILABLE') {
    //   for (var i = 0; i < storedSeats.length; i++) {
    //     if (storedSeats[i].seatId == seat.seatId) {
    //       storedSeats.splice(i, 1);
    //     }
    //   }
    // }
    if (seat.active == true && seat.status == 'AVAILABLE') {
      seat.active = false;
      this.avialableSeat--;
      this.totalTicketPrice = this.totalTicketPrice - seat.price;
      for (var i = 0; i < storedSeats.length; i++) {
        if (storedSeats[i].seatId == seat.seatId) {
          storedSeats.splice(i, 1);
        }
      }
      console.log(storedSeats);
      localStorage.setItem('SelectedSeats', JSON.stringify(storedSeats));
    } else if (
      this.avialableSeat < this.normalTicket &&
      seat.status == 'AVAILABLE'
    ) {
      seat.active = true;
      this.avialableSeat++;
      this.totalTicketPrice = this.totalTicketPrice + seat.price;
      storedSeats.push(seat);
      localStorage.setItem('SelectedSeats', JSON.stringify(storedSeats));
    }
    // console.log(seat.seatId);
  }

  onMinus(count: number, target: string) {
    count = count - 1;
    if (count < 0) {
      count = 0;
    } else {
      this.normalTicket = count;
    }
  }

  onPlus(count: number, target: string) {
    count = count + 1;
    if (count > 9) {
      count = 9;
    } else {
      this.normalTicket = count;
    }
  }
}
