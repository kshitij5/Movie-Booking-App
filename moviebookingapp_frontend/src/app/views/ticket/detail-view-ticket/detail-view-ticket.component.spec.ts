import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewTicketComponent } from './detail-view-ticket.component';

describe('DetailViewTicketComponent', () => {
  let component: DetailViewTicketComponent;
  let fixture: ComponentFixture<DetailViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailViewTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
