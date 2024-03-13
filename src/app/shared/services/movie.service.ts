import {computed, inject, Injectable, Signal, signal, WritableSignal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, EMPTY, map, Observable} from "rxjs";
import {Movie} from "../../page/movies-page/movies/movie";
import {MovieApi} from "../models/movie-api";
import {MovieDetails} from "../../page/movie-details-page/movie-details";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  #titleFilter$: WritableSignal<string> = signal('');
  titleFilter$: Signal<string> = computed<string>(() => this.#titleFilter$());
  #realaseDateFilter$: WritableSignal<string> = signal<string>('');
  realaseDateFilter$: Signal<string> = computed<string>(() => this.#realaseDateFilter$());

  private readonly http: HttpClient = inject(HttpClient);

  /**
   * Methode to search all Harry Potter Movies
   */
  getMovies(): Observable<Movie[]> {
    return this.http.get<MovieApi[]>('/movies')
      .pipe(
        map(
          (movies: MovieApi[]) => movies.map(
            movieApi => ({
                id: movieApi.id,
                title: movieApi.title,
                duration: movieApi.duration,
                budget: movieApi.budget,
                releaseDate: movieApi.release_date,
              }
            )
          )
        ),
        catchError(() => {
          alert("Movies not found");
          throw new Error("Movies not found");
          return EMPTY;
        })
      );
  }

  /**
   * Set a new value for titleFilter
   * @param valueToFilter the new value of titleFilter to set
   */
  updateTitleFilter(valueToFilter: string): void {
    this.#titleFilter$.set(valueToFilter);
  }

  /**
   * Set a new value to releaseYearFilter
   * @param valueToFilter the new value to set
   */
  updateReleaseYearFilter(valueToFilter: number | undefined): void {
    if (valueToFilter) {
      this.#realaseDateFilter$.set(valueToFilter.toString());
    } else {
      this.#realaseDateFilter$.set('');
    }
  }

  /**
   * Method to search a movie according to its id
   * @param id the id of the movie
   */
  getMovieById(id: string): Observable<MovieDetails> {
    const url: string = '/movies/' + id
    return this.http.get<MovieApi>(url).pipe(
      map(
        (movieApi: MovieApi) => ({
          id: movieApi.id,
          title: movieApi.title,
          duration: movieApi.duration,
          budget: movieApi.budget,
          releaseDate: movieApi.release_date,
          boxOffice: movieApi.box_office,
          cinematographers: movieApi.cinematographers,
          poster: movieApi.poster,
          producers: movieApi.producers,
          summary: movieApi.summary
        })
      ),
      catchError(() => {
        alert("Movie not found");
        throw new Error("Movie not found");
        return EMPTY;
      })
    )
      ;
  }
}
