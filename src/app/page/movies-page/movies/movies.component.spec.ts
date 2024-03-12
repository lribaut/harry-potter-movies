import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import SpyObj = jasmine.SpyObj;
import {Router} from "@angular/router";
import {RouterTestingModule} from "@angular/router/testing";
import {MovieService} from "../../../shared/services/movie.service";

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let routerSpy : SpyObj<Router>;
  let movieServiceSpy : SpyObj<MovieService>;

  beforeEach(async () => {
    routerSpy =  jasmine.createSpyObj('Router', ['navigate']);
    movieServiceSpy =  jasmine.createSpyObj('MovieService', ['getMovies','updateTitleFilter','updateReleaseYearFilter']);
    await TestBed.configureTestingModule({
      imports: [
        MoviesComponent,
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('goToMovieDetail', () => {
    it('should call navigate', () => {
      const id : string = '1';
      component.goToMovieDetail(id);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/movies',id]);
      expect(movieServiceSpy.updateReleaseYearFilter).toHaveBeenCalledWith(undefined);
      expect(movieServiceSpy.updateTitleFilter).toHaveBeenCalledWith('');
    });
  })
});
