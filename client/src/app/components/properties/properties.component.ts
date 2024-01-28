
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
    nodeId!: string| null;
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

      this.route.paramMap.subscribe(paramMap =>{
        this.nodeId= paramMap.get('id');
  
      })
    }
  
    filterData(): void {
      const propertyValue = this.dataService.getPropertyValue(this.dataKey);
      if (Array.isArray(propertyValue)) {
        this.filteredData = propertyValue;
      } else {
        this.filteredData = [];
      }
      this.searchResults = [...this.filteredData]; // Initialize searchResults with all data
    }
  
    search(): void {
      if (this.searchQuery) {
        this.searchResults = this.filteredData.filter(item => 
          item.address && item.address.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.searchResults = [...this.filteredData]; // Show all data if searchQuery is empty
      }
    }
  
    getPropertyValue(propertyName: string): any {
      return this.dataService.getPropertyValue(propertyName);
    }
  
    renderValue(value: any): string {
      return this.dataService.renderValue(value);
    }
  
    transformKey(key: string): string {
      return this.dataService.transformKey(key);
    }
  }
