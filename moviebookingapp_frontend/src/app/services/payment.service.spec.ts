import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PaymentService } from './payment.service';
import { URLs } from '../_shared/urls';
import { Payment } from '../models/payment';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    });
    service = TestBed.inject(PaymentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all payments', () => {
    service.getPayments().subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.PAYMENT_API_BASE_URL + '/all'
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  it('should get payments by Id', () => {
    const paymentid = '1234556';
    service.getPaymentById(paymentid).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      URLs.PAYMENT_API_BASE_URL + '/search/' + paymentid
    );
    expect(req.request.method).toBe('GET');
    req.flush({}); // Simulate a successful response
  });

  // it('should create payments', () => {
  //   const payments = new Payment();
  //   service.createPayment(payments).subscribe((response) => {
  //     expect(response).toBeTruthy();
  //   });

  //   const req = httpTestingController.expectOne(
  //     URLs.PAYMENT_API_BASE_URL + '/add'
  //   );
  //   expect(req.request.method).toBe('POST');
  //   req.flush({}); // Simulate a successful response
  // });
});
