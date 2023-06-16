import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewPaymentComponent } from './list-view-payment.component';

describe('ListViewPaymentComponent', () => {
  let component: ListViewPaymentComponent;
  let fixture: ComponentFixture<ListViewPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
