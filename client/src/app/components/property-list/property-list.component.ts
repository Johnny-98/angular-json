import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyListComponent implements OnInit {
  dataKey: string = "suggestions";
  carouselData: any = [];

  //for the search
  filteredData: any[] = [];
  searchQuery: string = '';
  searchResults: any[] = [];

  //used to assign each onject an img
  images: string[] = [
    "https://loveincorporated.blob.core.windows.net/contentimages/main/2ba923f2-25b7-403b-b3c3-95ac2016c7bb-shire-hobbit-home.jpg",
    "https://plan-a.ca/wp-content/uploads/2022/12/4800_paul_pouliot_30207_web-scaled.jpg",
    "https://www.travaux.com/images/cms/original/ebcd4d3c-6a00-47d2-8165-6d9e192082af.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgpPlite_Wqu3fZqVU2Pmw8KU2YfAnGgZgA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagkKt2ni_6C7wnTkg26wZPfrJXYCvRujS4g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt4Y8riQLIgBNRiIJmtLBh4agYWR-MQGArWQ&usqp=CAU",
    "https://www.century21.fr/imagesBien/s3/202/468/nologo_c21_202_468_24941_8_ADB6FFCA-BE94-40B4-9CD5-3C9AB382541A.jpg",
    "https://www.century21.fr/imagesBien/s3/202/3502/c21_202_3502_812_8_37251230-CC14-45FD-92FE-11733DDA0A3D.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTagkKt2ni_6C7wnTkg26wZPfrJXYCvRujS4g&usqp=C",
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Tardis_BBC_Television_Center.jpg",
  ];
  currentIndex: number = 0;
  
  //used for the caroulsel
  responsiveOptions = [
    {
      breakpoint: '2219px',
      numVisible: 4,
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
        this.getPropertyValue(this.dataKey);
        this.filterData(this.carouselData);

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.responsiveOptions;
    
  }

  //search functionality
  filterData(data: any): void {
    const propertyValue = data;
    if (Array.isArray(propertyValue)) {
      this.filteredData = propertyValue.map(item => ({
        ...item,
      }));
    } else {
      this.filteredData = [];
    }
    this.searchResults = [...this.filteredData];
  }

  search(): void {
    this.dataService.fetchPropertyDetails(this.searchQuery).subscribe(
      response => {
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


  //filter stuff
  getPropertyValue(propertyName: string): any {
    const propertyValue = this.dataService.getPropertyValue(propertyName);
    if (Array.isArray(propertyValue)) {
      this.carouselData = propertyValue.map((item, index) => ({
        ...item,
        images_path: this.images[index % this.images.length] // Assign images in a loop
      }));
    }

    return this.carouselData;
  }

  renderValue(value: any): string {
    return this.dataService.renderValue(value);
  }

  transformKey(key: string): string {
    return key;
  }
}
