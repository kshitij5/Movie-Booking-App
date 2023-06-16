import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ShowService } from './show.service';
import { URLs } from '../_shared/urls';
import { Show } from '../models/show';

describe('ShowService', () => {
  let service: ShowService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShowService],
    });
    service = TestBed.inject(ShowService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('update ticket status for a movie', () => {
    var selectedShow = new Show(); //{ showId: '1234', ticketStatus: 'BOOK_ASAP' };
    service.updateTicketStatus(selectedShow).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.SHOW_API_BASE_URL +
        '/updateTicket/' +
        selectedShow.showId +
        '/' +
        selectedShow.ticketStatus
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('should get all SHOWS', () => {
    service.getAllShows().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.SHOW_API_BASE_URL + '/all'
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });
});
