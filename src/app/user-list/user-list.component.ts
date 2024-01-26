import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  indexes: any = {};
  demographicSummary: any = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data) => {
        if (data.indexes) {
          for (const key in data.indexes) {
            if (data.indexes.hasOwnProperty(key) && typeof data.indexes[key] === 'object' && this.isEmptyObject(data.indexes[key])) {
              data.indexes[key] = 'empty object';
            }
          }
          this.indexes = data.indexes;
        }
        if (data.demographicSummary) {
          this.demographicSummary = data.demographicSummary;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  renderValue(value: any): string {
    return Array.isArray(value) ? value.join(', ') : String(value);
  }

  transformKey(key: unknown): string {
    return String(key).replace('_', ' ');
  }

  isObject(value: any): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null;
  }

  private isEmptyObject(obj: any): boolean {
    return Object.keys(obj).length === 0;
  }
}