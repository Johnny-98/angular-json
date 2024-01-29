import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserListComponent implements OnInit {
  // Use a single key for filtering
  dataKey: string = "suggestions";
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

  //NEW
  products: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.fetchData().subscribe(
      (data) => {
        this.dataService.setDataStore(data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

    this.responsiveOptions 

    //NEW
    this.products = [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accessories',
        quantity: 24,
        inventoryStatus: 'INSTOCK',
        rating: 5
      },
      // Add more product objects as needed
    ];
  }

  //NEW
  getSeverity(product: any) {
    switch (product.inventoryStatus) {
      case 'INSTOCK':
        return 'success';

      case 'LOWSTOCK':
        return 'warning';

      case 'OUTOFSTOCK':
        return 'danger';

      default:
        return null;
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
