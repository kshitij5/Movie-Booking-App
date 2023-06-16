import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Show } from 'src/app/models/show';
import { Theatre } from 'src/app/models/theatre';
import { AdminService } from 'src/app/services/admin.service';
import { MovieService } from 'src/app/services/movie.service';
import { ShowService } from 'src/app/services/show.service';
import { TheatreService } from 'src/app/services/theatre.service';
import { BookingService } from 'src/app/services/booking.service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  movies: Movie[] = [];
  theaters: Theatre[] = [];
  shows: Show[] = [];
  bookings: Booking[] = [];

  mapMoviesForm!: FormGroup;
  errorMessage: string = '';
  isMapSuccessful = false;
  selectedShow: Show = new Show();
  updateStatus!: FormGroup;
  isUpdateSuccessful: boolean = false;

  constructor(
    // private matDialog: MatDialog,
    private showService: ShowService,
    private bookingService: BookingService,
    private mService: MovieService,
    private tService: TheatreService,
    private adminService: AdminService,
    private fb: FormBuilder
  ) {
    this.getAllMovies();
    this.getAllTheaters();
    this.getBookings();
  }

  ngOnInit(): void {
    this.mapMoviesForm = this.fb.group({
      movieId: ['', Validators.required],
      showId: ['', Validators.required],
    });

    this.updateStatus = this.fb.group({
      show: [new Show(), Validators.required],
    });
  }

  eticketStatus = ['SOLD_OUT', 'BOOK_ASAP'];
  changeMovieId(e: any): void {
    console.log(e.value);
    this.movieId!.setValue(e.target.value, { onlySelf: true });
  }

  changeShowId(e: any): void {
    console.log(e.value);
    this.showId!.setValue(e.target.value, { onlySelf: true });
  }

  choseShow(e: any): void {
    console.log(JSON.stringify(e.target.value.toString()));
    this.show!.setValue(e.target.value, { onlySelf: true });
    this.selectedShow = e.target.value;
  }

  changeticketStatus(event: any) {
    console.log(JSON.stringify(event.target.value.toString()));
    this.selectedShow.ticketStatus = event.target.value;
    console.log(JSON.stringify(this.selectedShow));
  }
  get movieId() {
    return this.mapMoviesForm.get('movieId');
  }

  get showId() {
    return this.mapMoviesForm.get('showId');
  }

  get show() {
    return this.updateStatus.get('show');
  }

  getAllMovies(): void {
    this.mService.getAllMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  getAllTheaters(): void {
    this.tService.getAllTheatres().subscribe((data: Theatre[]) => {
      this.theaters = data;
    });
  }

  getShowsByTheatreId(theaterId: any): void {
    console.log('getShowsByTheatreId: ${theaterId}');

    theaterId = theaterId.target.value;
    this.showService.getShowsByTheatreId(theaterId).subscribe((data: any[]) => {
      this.shows = data;
    });
  }

  getBookings() {
    this.bookingService.getBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  updateTicketStatus(): void {
    console.log(this.updateStatus.value);
    this.showService.updateTicketStatus(this.selectedShow).subscribe(
      (res: any) => {
        console.log(res);
        this.isUpdateSuccessful = true;
      },
      (error: any) => {
        this.errorMessage = error;
      }
    );
  }

  mapMovies() {
    if (!this.mapMoviesForm.valid) alert('Please fill all the required inputs');
    else {
      this.adminService.addToShow(this.mapMoviesForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.isMapSuccessful = true;
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    }
  }
}
