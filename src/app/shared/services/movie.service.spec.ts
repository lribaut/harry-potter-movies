import { TestBed } from '@angular/core/testing';

import {HttpClient} from "@angular/common/http";
import {MovieApi} from "../models/movie-api";
import {of} from "rxjs";
import {Movie} from "../../page/movies-page/movies/movie";
import {MovieDetails} from "../../page/movie-details-page/movie-details";
import {computed, signal, WritableSignal} from "@angular/core";
import {MovieService} from "./movie.service";
import {Router} from "@angular/router";

describe('MovieService', () => {
  let httpClientSpy : jasmine.SpyObj<HttpClient>;
  let routerSpy : jasmine.SpyObj<Router>;
  let service: MovieService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj<HttpClient>(['get']);
    routerSpy =  jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('realaseDateFilter$',() => {
    it('should return the #realaseDateFilter$ initial value', () => {
      expect(service.realaseDateFilter$()).toEqual('');
    });
  })

  describe('titleFilter$', () => {
    it('should return the #titleFilter$ initial value', () => {
      expect(service.titleFilter$()).toEqual('');
    });
  })

  describe('getMovieById', () => {
    it('should be return expected movie', () => {
      //GIVEN
      const movieApi: MovieApi = {
        "id": "2cc602f2-e544-4f00-aec3-6439fad910b9",
        "title": "Fantastic Beasts: The Crimes of Grindelwald",
        "duration": "134",
        "budget": "200",
        "release_date": "2018-11-16",
        "box_office": "654.9",
        "cinematographers": ["Philippe Rousselot"],
        "poster": "https://www.wizardingworld.com/images/products/films/rectangle-10.png",
        "producers": ["David Heyman", "J. K. Rowling", "Steve Kloves", "Lionel Wigram"],
        "summary": "Fantastic Beasts: The Crimes of Grindelwald continues the story of Newt Scamander as he chases Credence Barebone on orders by Dumbledore, who suspects him to be Corvus Lestrange V. A twisted tale of vengeance and treachery unveils itself as the story advances and the true identity of Credence becomes even more obscure. Grindelwald’s plan to cause a war between muggles and wizards is set into motion, and Credence joins him."
      }

      const expectedMovie: MovieDetails = {
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
      }

      //WHEN
      httpClientSpy.get.and.returnValue(of(movieApi));

      //THEN
      service.getMovieById("2cc602f2-e544-4f00-aec3-6439fad910b9").subscribe({
          next: (movie) =>
            expect(movie).toEqual(expectedMovie)
        }
      )
    })
  })

  describe('getMovies', () => {
    it('should be return expected movies', () => {
      //GIVEN
      const movieApi: MovieApi[] = [{
        "id": "2cc602f2-e544-4f00-aec3-6439fad910b9",
        "title": "Fantastic Beasts: The Crimes of Grindelwald",
        "duration": "134",
        "budget": "200",
        "release_date": "2018-11-16",
        "box_office": "654.9",
        "cinematographers": ["Philippe Rousselot"],
        "poster": "https://www.wizardingworld.com/images/products/films/rectangle-10.png",
        "producers": ["David Heyman", "J. K. Rowling", "Steve Kloves", "Lionel Wigram"],
        "summary": "Fantastic Beasts: The Crimes of Grindelwald continues the story of Newt Scamander as he chases Credence Barebone on orders by Dumbledore, who suspects him to be Corvus Lestrange V. A twisted tale of vengeance and treachery unveils itself as the story advances and the true identity of Credence becomes even more obscure. Grindelwald’s plan to cause a war between muggles and wizards is set into motion, and Credence joins him."
      },
        {
          "id": "bcfd5548-da79-44df-a37b-511aa97d1834",
          "title": "Fantastic Beasts: The Secrets of Dumbledore",
          "duration": "142",
          "budget": "200",
          "release_date": "2022-04-08",
          "box_office": "379.8",
          "cinematographers": ["George Richmond"],
          "poster": "https://www.wizardingworld.com/images/products/films/rectangle-11.png",
          "producers": ["David Heyman", "J. K. Rowling", "Steve Kloves", "Lionel Wigram"],
          "summary": "The third movie in the Fantastic Beast Series sees Grindelwald trying to destroy the muggle world as Newt and his allies including Dumbledore try to stop him. Grindelwald kills a Qilin, a magical beast, to become the Supreme Leader of the ICW. Credence rethinks his decision to join Grindelwald upon realizing that he is the illegitimate son of Aberforth Dumbledore. The epic showdown takes place in Bhutan, where Dumbledore and Grindelwald fight it out after the blood pact that prevented them from dueling breaks. Grindelwald disapparates from the place and his plans are put to end."
        }
      ]

      const expectedMovie: Movie[] = [];
      movieApi.forEach(movieApi =>
        expectedMovie.push({
          id: movieApi.id,
          title: movieApi.title,
          duration: movieApi.duration,
          budget: movieApi.budget,
          releaseDate: movieApi.release_date
        }))

      //WHEN
      httpClientSpy.get.and.returnValue(of(movieApi));

      //THEN
      service.getMovies().subscribe(
           (movie) => expect(movie).toEqual(expectedMovie)
      )
    })
  })

  describe("setTitleFilter", () => {
    it('should update the titleFilter when it was call ', () => {
      //GIVEN
      const titleFilterExpect : WritableSignal<string> = signal('Fantastic Beasts: The Crimes of Grindelwald')
      service.titleFilter$ = computed(() => titleFilterExpect());

      const newTitle : string = 'Fantastic Beasts: The Secrets of Dumbledore';
      titleFilterExpect.set(newTitle);
      //WHEN
      service.updateTitleFilter(newTitle);
      //THEN
      expect(service.titleFilter$()).toEqual(newTitle);
    });
  })

  describe("setReleaseYearFilter", () => {
    it('should update the realaseDateFilter when it was call ', () => {
      //GIVEN
      const releaseYearFilterExepect : WritableSignal<string> = signal('2016')
      service.realaseDateFilter$ = computed(() => releaseYearFilterExepect());

      const newReleaseYear : number = 2010;
      releaseYearFilterExepect.set(newReleaseYear.toString());
      //WHEN
      service.updateReleaseYearFilter(newReleaseYear);
      //THEN
      expect(service.realaseDateFilter$()).toEqual(newReleaseYear.toString());
    });

    it('should update the realaseDateFilter with empty string  when it was call with a undefined parameter ', () => {
      //GIVEN
      const releaseYearFilterExepect : WritableSignal<string> = signal('2016')
      service.realaseDateFilter$ = releaseYearFilterExepect;

      const newReleaseYear : number | undefined = undefined;
      releaseYearFilterExepect.set('');
      //WHEN
      service.updateReleaseYearFilter(newReleaseYear);
      //THEN
      expect(service.realaseDateFilter$).toEqual(releaseYearFilterExepect);
    });
  })
});
