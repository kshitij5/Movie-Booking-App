import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-detail-view-movie',
  templateUrl: './detail-view-movie.component.html',
  styleUrls: ['./detail-view-movie.component.css'],
})
export class DetailViewMovieComponent implements OnInit {
  movie: Movie = new Movie();
  movieId: number | undefined;
  constructor(
    private actRouter: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.movieId = this.actRouter.snapshot.params['movieId'];
    this.movieService.getMovieById(this.movieId).subscribe((data: Movie) => {
      this.movie = data;
    });
  }

  // removeMovie(movieId: number) {
  //   this.movieService.deleteMovie(movieId).subscribe((data: Movie) => {
  //     this.ngOnInit();
  //     console.log(data);
  //   });
  // }
}
