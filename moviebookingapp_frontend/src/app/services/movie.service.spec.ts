import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { URLs } from '../_shared/urls';
import { Movie } from '../models/movie';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all movies', () => {
    service.getAllMovies().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.MOVIES_API_BASE_URL + '/all'
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('should delete a movie', () => {
    const movieName = 'Avengers',
      movieId = 1234;
    service.deleteMovie(movieId, movieName).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.MOVIES_API_BASE_URL + movieName + '/delete/' + movieId
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('Success');
  });

  it('should add a movie', () => {
    const movie = new Movie();
    service.addMovie(movie).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.MOVIES_API_BASE_URL + '/add'
    );
    expect(req.request.method).toBe('POST');
    req.flush('Success');
  });

  it('should update a movie', () => {
    const movie = new Movie();
    service.updateMovie(movie).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.MOVIES_API_BASE_URL + '/update'
    );
    expect(req.request.method).toBe('PUT');
    req.flush('Success');
  });

  it('should get movie BY Id', () => {
    const movieId = 1234;
    service.getMovieById(movieId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.MOVIES_API_BASE_URL + '/view/' + movieId
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });
});
