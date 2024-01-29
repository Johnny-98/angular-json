import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  dataKey: string = "suggestions";
  filteredData: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];
  
  responsiveOptions = [
    {
      breakpoint: '2219px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    }
  ];



  constructor(private dataService: DataService) {}

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

    this.responsiveOptions;
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

  onInputChanged(): void {
    if (!this.searchQuery) {
      this.searchQuery = '';
      this.searchResults = [...this.filteredData]; // Reset searchResults to the full data
    } else {
      this.search()
    }
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
}
