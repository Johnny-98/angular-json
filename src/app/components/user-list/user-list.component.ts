import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';

//NEW


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  // filter data by the given key
  dataKeys:any[] = ["suggestions"];
  responsiveOptions: any[] | undefined;

  // Inject DataService
  constructor(private dataService: DataService) {}

  // Fetch data when the component initializes
  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data) => {
        this.dataService.setDataStore(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )

    //NEW

    this.responsiveOptions = [
          {
            breakpoint: '2219',
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