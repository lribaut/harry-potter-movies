import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesPageComponent } from './movies-page.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {provideHttpClient} from "@angular/common/http";

describe('MoviesPageComponent', () => {
  let component: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPageComponent],
      providers:[provideHttpClient()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
