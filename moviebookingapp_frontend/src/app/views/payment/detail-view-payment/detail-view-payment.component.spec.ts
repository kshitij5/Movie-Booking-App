import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewPaymentComponent } from './detail-view-payment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailViewPaymentComponent', () => {
  let component: DetailViewPaymentComponent;
  let fixture: ComponentFixture<DetailViewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DetailViewPaymentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
