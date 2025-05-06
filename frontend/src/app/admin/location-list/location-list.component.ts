import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';


@Component({
  selector: 'app-location-list',
  imports: [],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locationList: Location[] = [];

  constructor(private readonly locationService: LocationService) { }


  ngOnInit(): void {
    this.locationService.getAllLocations().then((locations: Location[]) => {
      this.locationList = locations;
    })
  }


}
