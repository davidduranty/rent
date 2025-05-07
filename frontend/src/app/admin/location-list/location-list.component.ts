import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-location-list',
  imports: [MatIconModule],
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
