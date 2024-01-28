import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data'; // URL to web API
  private socket = io('http://localhost:3000'); // URL to Socket.IO server
  public dataStore: any; // Public Store for your data

  constructor(private http: HttpClient) {}

  // Fetch data from the server
  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Listen for real-time data updates from the server
  getDataUpdates(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('data', (data) => {
        this.setDataStore(data); // Update data store upon receiving new data
        observer.next(data);
      });

      // Handle disconnection
      return () => this.socket.disconnect();
    });
  }

  // Store data in dataStore
  setDataStore(data: any): void {
    this.dataStore = data;
  }

   // shows the value for the given data object
  getPropertyValue(propertyName: string): any {
    return this.dataStore ? this.dataStore[propertyName] : null;
  }

  //Renders the value for display. Handles different data types.
  renderValue(value: any): string {
    // Implement according to your needs. For now, just converting to string.
    return value ? value.toString() : '';
  }

  // Replaces underscores with spaces
  transformKey(key: string): string {
    // Example implementation: replace underscores with spaces and capitalize
    return key ? key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  }
}
