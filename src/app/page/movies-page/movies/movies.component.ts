import {AsyncPipe, NgFor, NgIf} from '@angular/common';
import {Component, inject, OnInit, Signal} from '@angular/core';
import { Observable } from 'rxjs';
import {Movie} from "./movie";
import {MillionDollarsPipe} from "../../../shared/pipes/million-dollars.pipe";
import {DurationPipe} from "../../../shared/pipes/duration.pipe";
import {Router} from "@angular/router";
import {MovieService} from "../../../shared/services/movie.service";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor, AsyncPipe, MillionDollarsPipe, DurationPipe, NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  /**
   * Injection of MovieService
   */
  private readonly service : MovieService = inject(MovieService)

  /**
   * Injection of Router
   */
  private readonly router : Router = inject(Router)

  /**
   * List of movies
   */
  dataMovies$: Observable<Movie[]> = this.service.getMovies();

  /**
   * Value of title filter
   */
  titleFilter: Signal<string> = this.service.titleFilter$;

  /**
   * Value of release year filter
   */
  releaseYearFilter: Signal<string> = this.service.realaseDateFilter$;


  /**
   * Méthod to navigate to movie detail page
   * @param idMovie the movie id we want display detail page
   */
  goToMovieDetail(idMovie: string) : void {
    this.resetFilters();
    this.router.navigate(['/movies',idMovie]);
  }

  /**
   * Method to reset filters
   */
  private resetFilters(): void {
    this.service.updateTitleFilter('');
    this.service.updateReleaseYearFilter(undefined);
  }
}
