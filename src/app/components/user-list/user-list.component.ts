import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  dataStore: any = {};

  dataKeys:any[] = ["indexes" , "demographicSummary"]

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data) => {
        this.handleData(data, this.dataStore);  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }

  private handleData(data: any, targetObject: any): void {
    if (data && typeof data === 'object') {
      
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          let value = data[key];
          targetObject[key] = value;
        }
      }
    }
  }

  renderValue(value: any): string {
    // Check for empty object specifically
    if (this.isObject(value) && this.isEmptyObject(value)) {
      return "novalue"; // Return "novalue" if the object is empty
    }
    if (this.isObject(value)) {
      return JSON.stringify(value, null, 2); // Converts object to formatted JSON string
    }
    return Array.isArray(value) ? value.join(', ') : String(value);
  }
  transformKey(key: unknown): string {
    return String(key).replace('_', ' ');
  }
  isObject(value: any): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }
  isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
  getPropertyValue(propertyName: string): any {
    return this.dataStore[propertyName];
  }
}