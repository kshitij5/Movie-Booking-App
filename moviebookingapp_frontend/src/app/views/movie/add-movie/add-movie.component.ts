import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Validation from 'src/app/_helpers/validation';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css'],
})
export class AddMovieComponent implements OnInit {
  form: FormGroup = new FormGroup({
    movieId: new FormControl(''),
    movieName: new FormControl(''),
    moviePosterUrl: new FormControl(''),
    movieHours: new FormControl(''),
    movieGenre: new FormControl(''),
    movieLanguage: new FormControl(''),
    movieDescription: new FormControl(''),
    movieRating: new FormControl(''),
    movieDate: new FormControl(''),
  });
  submitted = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      movieId: ['', Validators.required],
      movieName: ['', Validators.required],
      moviePosterUrl: ['', Validators.required],
      movieHours: ['', Validators.required],
      movieGenre: ['', Validators.required],
      movieLanguage: ['', Validators.required],
      movieDescription: ['', Validators.required],
      movieRating: ['', Validators.required],
      movieDate: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.movieService.addMovie(this.form.value).subscribe(
      (data) => {
        console.log(JSON.stringify(data, null, 2));
        this.submitted = true;
      },
      (err) => {
        this.errorMessage = err.error.message;
        console.log(err);
      }
    );
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
