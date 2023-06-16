import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Show } from 'src/app/models/show';
import { Theatre } from 'src/app/models/theatre';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-theatre-booking',
  templateUrl: './theatre-booking.component.html',
  styleUrls: ['./theatre-booking.component.css'],
})
export class TheatreBookingComponent implements OnInit {
  theatres: any[] = [];
  shows: Show[] = [];
  movieId: string = '';
  movie!: Movie;
  constructor(
    private theatreService: TheatreService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    this.getMovies(this.movieId);
    this.getTheatres(this.movieId);
  }

  getMovies(movieId: string) {
    this.movieService.getMovieById(movieId).subscribe((data) => {
      this.movie = data;
      console.log(data);
    });
  }

  getTheatres(movieId: string) {
    this.theatreService
      .findTheatresbyMovie(this.movieId)
      .subscribe((data: Show[]) => {
        this.shows = data;
        console.log(this.shows);
        // for (let scr of this.show) {
        //   this.theatres.add(scr.theatre);
        //   console.log(scr.theatre);
        // }
      });
  }
}
