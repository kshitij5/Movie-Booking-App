import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLs } from '../_shared/urls';

describe('AdminService', () => {
  let service: AdminService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map show to movie', () => {
    const value = { movieId: '1234', showId: '1234' };

    service.addToShow(value).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(
      URLs.SHOW_API_BASE_URL + '/map/' + value.movieId + '/' + value.showId
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });
});
