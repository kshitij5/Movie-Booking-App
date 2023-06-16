import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { URLs } from '../_shared/urls';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public Payment!: Observable<Payment>;
  constructor(private http: HttpClient) {}

  getPayments(): Observable<any[]> {
    return this.http.get<any>(URLs.PAYMENT_API_BASE_URL + '/all');
  }

  getPaymentById(id: string): Observable<Payment> {
    return this.http.get<Payment>(URLs.PAYMENT_API_BASE_URL + '/search/' + id);
  }

  createPayment(payment: Payment) {
    console.log(payment);
    return this.http.post<Payment>(URLs.PAYMENT_API_BASE_URL + '/add', payment);
  }
}
