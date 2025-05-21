import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/location.service';
import { MatIconModule } from '@angular/material/icon';
import { NewLocationComponent } from "./new-location/new-location.component";
import { PublicHolidayComponent } from "../public-holiday/public-holiday.component";
import { ModifyLocationComponent } from "./modify-location/modify-location.component";


@Component({
  selector: 'app-location-list',
  imports: [MatIconModule, NewLocationComponent, PublicHolidayComponent, ModifyLocationComponent],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.css'
})
export class LocationListComponent implements OnInit {
  locationList: Location[] = [];
  isAddLocation: boolean = false;
  isPublicHoliday: boolean = false;
  isModifyLocation: boolean = false;
  publicHolidayId!: number;
  modifyLocation: Location = {
    id: 0,
    name: '',
    address: '',
    city: '',
    zipCode: 0,
    publicHoliday: { id: 0, monday: '', tuesday: '', wednesday: '', thursday: '', friday: '', saturday: '', sunday: '' },
    vehicles: []
  };


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

  ModifyLocationId(location: Location) {
    console.log(location);

    this.isModifyLocation = true
    this.modifyLocation = location;
  }

  async deleteLocation(id: number): Promise<void> {
    const addDeleteLocation = await this.locationService.addDeleteLocation(id)
    window.location.reload();
    if (addDeleteLocation) {
      this.locationList = this.locationList.filter(location => location.id !== id);
    }
  }

}
