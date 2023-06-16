import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TheatreService } from './theatre.service';

describe('TheatreService', () => {
  let service: TheatreService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TheatreService],
    });
    service = TestBed.inject(TheatreService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
});
