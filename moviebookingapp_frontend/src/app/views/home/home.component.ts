import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  content?: string;
  topRatedMovies: Movie[] | undefined;
  latestMovies: Movie[] | undefined;
  isAdmin: boolean = false;

  constructor(
    private moviesService: MovieService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    console.log('ROLE' + this.tokenStorage.getUser());
    // this.isAdmin =
    //   this.tokenStorage.getUser() != null
    //     ? this.tokenStorage.getUser().roles.includes('ROLE_ADMIN')
    //     : false;

    this.moviesService.getAllMovies().subscribe((data: Movie[]) => {
      this.topRatedMovies = data
        .sort((a, b) => (a.movieRating > b.movieRating ? -1 : 1))
        .slice(0, 8);
    });
    this.moviesService.getAllMovies().subscribe((data: Movie[]) => {
      this.latestMovies = data
        .sort((a, b) => (a.movieDate > b.movieDate ? -1 : 1))
        .slice(0, 3);
    });
  }
}
