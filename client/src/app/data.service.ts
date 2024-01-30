import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/data'; // URL to web API
  private microserviceUrl = 'http://localhost:4000'; // URL to the microservice
  private socket = io('http://localhost:3000'); // URL to Socket.IO server
  public dataStore: { [key: string]: any } = {};

  constructor(private http: HttpClient) {}

  // Fetch data from the server
  fetchData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Fetch property details from the microservice
  fetchPropertyDetails(query: string): Observable<any> {
    return this.http.get(`${this.microserviceUrl}/property-details`, { params: { query: query } });
  }

  // Method to fetch a product by its ID
  // used this instead to test the data upon refresh
  getProductById(productId: string): Observable<any> {
    // Assuming the backend has an endpoint like `/product-details/{id}`
    return this.http.get(`${this.microserviceUrl}/product-details/${productId}`);
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

  getPropertyValue(propertyName: string): any {
    return this.dataStore ? this.dataStore[propertyName] : null;
  }

  renderValue(value: any): string {
    return value ? value.toString() : '';
  }

  transformKey(key: string): string {
    return key ? key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';
  }
}
