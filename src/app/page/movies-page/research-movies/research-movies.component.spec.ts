import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchMoviesComponent } from './research-movies.component';
import SpyObj = jasmine.SpyObj;
import {MovieService} from "../../../shared/services/movie.service";

describe('ResearchMoviesComponent', () => {
  let component: ResearchMoviesComponent;
  let fixture: ComponentFixture<ResearchMoviesComponent>;
  let movieServiceSpy : SpyObj<MovieService>;

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['updateTitleFilter','updateReleaseYearFilter']);
    await TestBed.configureTestingModule({
      imports: [ResearchMoviesComponent],
      providers: [{provide: MovieService, useValue: movieServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call movieService.setTitleFilter', () => {
      component.titleControl.setValue('title');
      component.ngOnInit();
      expect(movieServiceSpy.updateTitleFilter).toHaveBeenCalledWith('title');
    });

    it('should call movieService.setReleaseYearFilter', () => {
      component.releaseYearControl.setValue(2020);
      component.ngOnInit();
      expect(movieServiceSpy.updateReleaseYearFilter).toHaveBeenCalledWith(2020);
    });
  });

  describe('ngOnDestroy', () => {
    it('should close subscription when component was destroy', () => {
      //GIVEN
      const unsuscribeSpy = spyOn(component.souscription, 'unsubscribe');
      //WHEN
      component.ngOnDestroy()
      //THEN
      expect(unsuscribeSpy).toHaveBeenCalledTimes(1)
    });
  })
});
