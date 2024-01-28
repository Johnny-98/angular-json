import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data.json';
  private _dataStore: any = {}; // Added to store the data

  constructor(private http: HttpClient) { }

  fetchData(): Observable<any> {
    return this.http.get<any>(this.dataUrl);
  }
  
  setDataStore(data: any): void {
    this._dataStore = data;
  }

  getDataStore(): any {
    return this._dataStore;
  }

  // shows the value for the given data object
  getPropertyValue(propertyName: string): any {
    return this.getDataStore()[propertyName];
  }

  //Renders the value for display. Handles different data types.
  renderValue(value: any): string {
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).length === 0 ? "novalue" : JSON.stringify(value, null, 2);
    }
    return Array.isArray(value) ? value.join(', ') : String(value);
  }

  // Replaces underscores with spaces
  transformKey(key: string): string {
    return key.replace('_', ' ');
  }
}
