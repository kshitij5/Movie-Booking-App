import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TokenStorageService],
    });
    service = TestBed.inject(TokenStorageService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should clear token on logout', () => {
    // localStorage.setItem('token', 'abcd1234');
    localStorage.setItem('userId', '123456');
    localStorage.setItem('role', 'ROLE_USER');

    expect(service.signOut()).toBeTrue();
    // expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should save token', () => {
    service.saveToken('token');
    expect(localStorage.getItem('auth-token')).toBe('token');
  });

  
  it('should get token', () => {
    const token = 'abcd1234';
    service.saveToken(token);

    expect(service.getToken()).toBe(token);
  });
});
