import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  nodeId!: string | null;
  dataKey = "suggestions";
  filteredData: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data) => {
        this.dataService.setDataStore(data);
        this.filterData();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.route.paramMap.subscribe(paramMap => {
      this.nodeId = paramMap.get('id');
    });
  }

  filterData(): void {
    const propertyValue = this.dataService.getPropertyValue(this.dataKey);
    if (Array.isArray(propertyValue)) {
      this.filteredData = propertyValue;
    } else {
      this.filteredData = [];
    }
    this.searchResults = [...this.filteredData];
  }

  search(): void {
    this.dataService.fetchPropertyDetails(this.searchQuery).subscribe(
      response => {
        console.log('Response:', response); // This will allow you to inspect the response object
        this.searchResults = response.details;
      },
      error => {
        console.error('Error fetching property details:', error);
      }
    );
  }

  getPropertyValue(propertyName: string): any {
    return this.dataService.getPropertyValue(propertyName);
  }

  renderValue(value: any): string {
    return this.dataService.renderValue(value);
  }

  transformKey(key: string): string {
    return key;
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [...this.filteredData];
  }
}
