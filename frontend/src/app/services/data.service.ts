import { Injectable } from '@angular/core';
import { Data } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private formData: Data[] = [];

  setData(data: Data[]) {
    this.formData = data;
  }

  getData(): Data[] {
    return this.formData;
  }

}
