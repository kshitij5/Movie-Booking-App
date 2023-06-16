import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Show } from 'src/app/models/show';
import { Theatre } from 'src/app/models/theatre';
import { TheatreService } from 'src/app/services/theatre.service';

@Component({
  selector: 'app-list-view-theatre',
  templateUrl: './list-view-theatre.component.html',
  styleUrls: ['./list-view-theatre.component.css'],
})
@Component({
  selector: 'app-list-view-theatre',
  templateUrl: './list-view-theatre.component.html',
  styleUrls: ['./list-view-theatre.component.css'],
})
export class ListViewTheatreComponent implements OnInit {
  theatres: any[] = [];
  show: Show[] = [];
  movieId: string = '';
  constructor(
    private theatreService: TheatreService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    
    this.theatreService.getAllTheatres().subscribe((data: Theatre[]) => {
      this.theatres = data;
      for (let scr of this.theatres) {
        console.log(scr.screen);
      }
    });
  }

  removeTheatre(theatreId: number) {
    this.theatreService.deleteTheatre(theatreId).subscribe((data: Theatre) => {
      this.ngOnInit();
      console.log(data);
    });
  }
}
