import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subscription, tap} from "rxjs";
import {MovieService} from "../../../shared/services/movie.service";

@Component({
  selector: 'app-research-movies',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './research-movies.component.html',
  styleUrl: './research-movies.component.css'
})
export class ResearchMoviesComponent implements OnInit, OnDestroy {

  /**
   * Injection of MovieService
   */
  private readonly service : MovieService = inject(MovieService);

  /**
   * FormControl for title filter
   */
  titleControl : FormControl = new FormControl(this.service.titleFilter$());

  /**
   * FormControl for release year filter
   */
  releaseYearControl : FormControl = new FormControl(this.service.realaseDateFilter$());

  /**
   * Subscription for detecting changes on title and release year filter
   */
  souscription : Subscription = new Subscription();


  ngOnInit(): void {
    this.detecteChangesOnTitleFilter();
    this.detecteChangesOnReleaseYearFilter();
  }

  /**
   * Method to modify title filter value when changes detected in template
   */
  private detecteChangesOnTitleFilter() : void {
    this.souscription.add(
      this.titleControl.valueChanges.pipe(
        tap(value => this.service.updateTitleFilter(value))
      ).subscribe()
    )
  }

  /**
   * Method to modify release year filter value when changes detected in template
   */
  private detecteChangesOnReleaseYearFilter() : void {
    this.souscription.add(
      this.releaseYearControl.valueChanges.pipe(
        tap(value =>
          this.service.updateReleaseYearFilter(value))
      ).subscribe()
    )
  }

  ngOnDestroy(): void {
    this.souscription.unsubscribe();
  }


}
