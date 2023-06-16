import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewMovieComponent } from './detail-view-movie.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailViewMovieComponent', () => {
  let component: DetailViewMovieComponent;
  let fixture: ComponentFixture<DetailViewMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [DetailViewMovieComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
