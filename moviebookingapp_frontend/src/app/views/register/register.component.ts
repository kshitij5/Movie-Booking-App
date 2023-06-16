import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    emailId: null,
    firstName: null,
    lastName: null,
    contactNumber: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  passwordsMatching = false;
  responseText = '';
  isConfirmPasswordDirty = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const {
      firstName,
      lastName,
      emailId,
      password,
      confirmPassword,
      contactNumber,
    } = this.form;

    this.authService
      .register(
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword,
        contactNumber
      )
      .subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.responseText = data.message;
          // this.router.navigate(['/login']);
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
          this.isSuccessful = false;
        }
      );
  }
}
