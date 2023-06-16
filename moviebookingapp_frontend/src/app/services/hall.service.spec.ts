import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HallService } from './hall.service';
import { URLs } from '../_shared/urls';

describe('HallService', () => {
  let service: HallService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HallService],
    });
    service = TestBed.inject(HallService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all movies', () => {
    const hallId = 'PVR';
    service.getHallById(hallId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.HALL_API_BASE_URL + '/search/' + hallId
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });
});
