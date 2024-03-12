import { Component } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { ResearchMoviesComponent } from './research-movies/research-movies.component';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [MoviesComponent,ResearchMoviesComponent],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.css'
})
export class MoviesPageComponent {

}
