import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '../models/location.model';
import { LocationsService } from '../services/locations.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: Location[] | undefined;
  locationsSubscription: Subscription | undefined;
  loadingSubscription: Subscription | undefined;
  loading: boolean = false;
  nextSubscription: Subscription | undefined;
  next: boolean = false;
  previousSubscription: Subscription | undefined;
  previous: boolean = false;

  error = "";
  search = "";
  dimension = "";
  page = 1;

  changePage(val: number) {
    this.page += val;
    this.reloadService()
  }

  reloadPage() {
    this.page = 1;
    this.reloadService()
  }

  reloadService () {
    this.locationsSubscription?.unsubscribe();
    this.locationsSubscription = this.locationsService.getLocations(this.search, this.dimension, this.page).subscribe((locations) => {
      this.error = "";
      this.locations = locations;
    }, (error) => {
      this.locations = [];
      this.next = false;
      this.previous = false;
      this.error = error.message;

      if (error.status === 404) {
        this.error = "No Results";
      }
    })
  }

  constructor(private locationsService: LocationsService) { }

  ngOnInit(): void {
    this.locationsSubscription = this.locationsService.getLocations(this.search, this.dimension, this.page).subscribe((locations) => {
      this.locations = locations
    })

    this.loadingSubscription = this.locationsService.getLoadingState().subscribe((loading) => {
      this.loading = loading
    })

    this.nextSubscription = this.locationsService.getNextState().subscribe((next) => {
      this.next = next;
    })

    this.previousSubscription = this.locationsService.getPreviousState().subscribe((previous) => {
      this.previous = previous;
    })
  }

  ngOnDestroy(): void {
      this.locationsSubscription?.unsubscribe();
      this.loadingSubscription?.unsubscribe();
      this.nextSubscription?.unsubscribe();
      this.previousSubscription?.unsubscribe();
  }

}
