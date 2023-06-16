import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { URLs } from '../_shared/urls';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
    localStorage.clear();
  });

  it('should send login request', () => {
    const username = 'est@est.com',
      password = 'password';

    authService.login(username, password).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.AUTH_API_BASE_URL + '/login'
    );
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should set login status', () => {
    const token = 'true';

    const result = authService.setLoginStatus(token);

    expect(result).toBeTrue();
    expect(localStorage.getItem('loginStatus')).toBe(token);
  });

  it('should set login status', () => {
    const token = 'true';

    const result = authService.setLoginStatus(token);

    expect(result).toBeTrue();
    expect(localStorage.getItem('loginStatus')).toBe(token);
  });

  it('should get login status', () => {
    const token = 'true';

    const result = authService.setLoginStatus(token);

    expect(result).toBeTrue();
    expect(localStorage.getItem('loginStatus')).toBe(token);
  });

  it('should set CustomerId to local storage', () => {
    const id = '12345';

    authService.setCustomerId(id);
    expect(localStorage.getItem('customerId')).toBe(id);
  });

  it('should set user role to local storage', () => {
    const role = 'ROLE_USER';

    authService.setUserRole(role);
    expect(localStorage.getItem('role')).toBe('ROLE_USER');
  });

  it('should get role from local storage', () => {
    const role = 'ROLE_USER';
    authService.setUserRole(role);
    expect(authService.getUserRole()).toBe('ROLE_USER');
  });

  it('should register a user', () => {
    let firstName = 'John',
      lastName = 'Doe',
      emailId = 'john@example.com',
      password = 'password',
      confirmPassword = 'password',
      contactNumber = '123';

    authService
      .register(
        firstName,
        lastName,
        emailId,
        password,
        confirmPassword,
        contactNumber
      )
      .subscribe((response) => {
        expect(response).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      URLs.AUTH_API_BASE_URL + '/signup'
    );
    expect(req.request.method).toBe('POST');
    req.flush({}); // Simulate a successful response
  });
});
