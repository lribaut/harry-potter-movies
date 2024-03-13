import { Routes } from '@angular/router';
import { MoviesPageComponent } from './page/movies-page/movies-page.component';
import {MovieDetailsPageComponent} from "./page/movie-details-page/movie-details-page.component";

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent : () => import('./page/movies-page/movies-page.component').then(c => c.MoviesPageComponent)
  },
  {
    path: 'movies/:id',
    loadComponent: () => import('./page/movie-details-page/movie-details-page.component').then(c => c.MovieDetailsPageComponent)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'movies'
  },
  {
    path: '**',
    redirectTo: 'movies'
  }
];
