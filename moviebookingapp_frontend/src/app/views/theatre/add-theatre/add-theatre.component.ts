import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css'],
})
export class AddTheatreComponent implements OnInit {
  form: FormGroup = new FormGroup({
    theatreId: new FormControl(''),
    theatreName: new FormControl(''),
    theatreCity: new FormControl(''),
  });
  submitted = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private theatreService: TheatreService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      theatreId: ['', Validators.required],
      theatreName: ['', Validators.required],
      theatreCity: ['', Validators.required],
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

    this.theatreService.addTheatre(this.form.value).subscribe(
      (data: any) => {
        console.log(JSON.stringify(data, null, 2));
        this.submitted = true;
      },
      (err: { error: { message: string } }) => {
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
