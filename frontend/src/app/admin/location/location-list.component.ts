import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { MatIconModule } from '@angular/material/icon';
import { NewLocationComponent } from "./new-location/new-location.component";
import { PublicHolidayComponent } from "../public-holiday/public-holiday.component";


@Component({
  selector: 'app-location-list',
  imports: [MatIconModule, NewLocationComponent, PublicHolidayComponent],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locationList: Location[] = [];
  isAddLocation: boolean = false;
  isPublicHoliday: boolean = false;
  publicHolidayId!: number;

  constructor(private readonly locationService: LocationService) { }


  ngOnInit(): void {
    this.locationService.getAllLocations().then((locations: Location[]) => {
      this.locationList = locations;
    })
  }
  onAddLocation() {
    this.isAddLocation = true
  }
  onCloseAddLocation() {
    this.isAddLocation = false
  }

  onClick(id: number) {
    this.isPublicHoliday = true
    this.publicHolidayId = id;
  }

}
