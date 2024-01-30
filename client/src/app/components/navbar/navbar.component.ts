import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router:Router){}

    ngOnInit() {
        this.items = [
            {label: 'Home', command:()=> this.navigateToHome()},
            {label: 'Blog', command:()=> this.navigateToBlog()},
            {label: 'Contact Us'},
            {label: 'Sign Up'}
        ];
    }
    
    navigateToHome() {
    this.router.navigate(['/product-list']);
    }
    navigateToBlog() {
        this.router.navigate(['/blog']);
    }
    //login
}