import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-propery-details',
  templateUrl: './propery-details.component.html',
  styleUrls: ['./propery-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProperyDetailsComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute, 
    private dataService: DataService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        this.product = this.dataService.getProductById(productId).subscribe(
          product => this.product = product,
          error => {
            console.error('Error fetching product:', error);
            // Handle the error
          }
        );
      } else {
        console.error('No product ID provided in the route');
      }
    });
  }
}
