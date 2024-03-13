import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsPageComponent } from './movie-details-page.component';
import SpyObj = jasmine.SpyObj;
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {MovieDetails} from "./movie-details";
import {MovieService} from "../../shared/services/movie.service";

describe('MovieDetailsPageComponent', () => {
  let component: MovieDetailsPageComponent;
  let fixture: ComponentFixture<MovieDetailsPageComponent>;
  let routerSpy : SpyObj<Router>;
  let movieServiceSpy : SpyObj<MovieService>;
  let activatedRouteMock :  {paramMap: Observable<ParamMap>}

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovieById']);
    activatedRouteMock = {paramMap: of({
        get : () => '1',
        has : () => true,
        getAll : () =>  [],
        keys :  []
      })};
    await TestBed.configureTestingModule({
      imports: [MovieDetailsPageComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    })
    .compileComponents();


    fixture = TestBed.createComponent(MovieDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return error', async () => {
    activatedRouteMock = {paramMap: of({
        get : () => null,
        has : () => true,
        getAll : () =>  [],
        keys :  []
      })};
    await TestBed.configureTestingModule({
      imports: [MovieDetailsPageComponent],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: MovieService, useValue: movieServiceSpy}
      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(MovieDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.movie.subscribe(
      (movieDetails) => {
        expect(movieServiceSpy.getMovieById).toHaveBeenCalledWith('1');
      }
    )
  })
  it('should call movieService when id was defined ', () => {
    const expectedMovieDetails : MovieDetails = {
      id: '1',
      title: '',
      duration: '',
      budget: '',
      releaseDate: '',
      boxOffice: '',
      cinematographers: [''],
      poster: '',
      producers: [''],
      summary:''
    }
    movieServiceSpy.getMovieById.and.returnValue(of(expectedMovieDetails));
    component.movie.subscribe(
      (movieDetails) => {
        expect(movieServiceSpy.getMovieById).toHaveBeenCalledWith('1');
        expect(movieDetails).toEqual(expectedMovieDetails);
      }
    )
  });

  describe("goBack", () => {
    it("should call router navigate", () => {
      component.goBack();
      expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
    })
  })

});
