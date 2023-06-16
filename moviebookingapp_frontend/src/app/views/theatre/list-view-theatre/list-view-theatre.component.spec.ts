import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewTheatreComponent } from './list-view-theatre.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListViewTheatreComponent', () => {
  let component: ListViewTheatreComponent;
  let fixture: ComponentFixture<ListViewTheatreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ListViewTheatreComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewTheatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
