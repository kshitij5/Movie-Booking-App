import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewHallComponent } from './detail-view-hall.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailViewHallComponent', () => {
  let component: DetailViewHallComponent;
  let fixture: ComponentFixture<DetailViewHallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DetailViewHallComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
