import {Component, inject} from '@angular/core';
import {catchError, EMPTY, mergeMap, Observable} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {MovieDetails} from "./movie-details";
import {DurationPipe} from "../../shared/pipes/duration.pipe";
import {MillionDollarsPipe} from "../../shared/pipes/million-dollars.pipe";
import {MovieService} from "../../shared/services/movie.service";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DurationPipe,
    MillionDollarsPipe
  ],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.css'
})
export class MovieDetailsPageComponent {

  /**
   * Injection of MovieService
   */
  private readonly service : MovieService = inject(MovieService);

  /**
   * Injection of Router
   */
  private readonly router : Router = inject(Router);

  /**
   * Injection of ActivatedRoute
   */
  private readonly route : ActivatedRoute = inject(ActivatedRoute);

  /**
   * selected details movie
   */
  movie: Observable<MovieDetails> = this.route.paramMap.pipe(
    mergeMap((paramMap: ParamMap) => {
      const id: string | null = paramMap.get('id');
      if (!id) {
        throw new Error('No id provided');
      }
      return this.service.getMovieById(id!);
    })
    , catchError(() => {
      alert("Missing id parameter");
      console.error("Missing id parameter");
      this.goBack();
      return EMPTY;
    })
  )

  /**
   * Method to return to movies list
   */
  goBack() {
    this.router.navigate(['/movies'])
  }

}
