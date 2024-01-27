import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}

  //future
  // navigateToNavbar() {
  //   this.router.navigate(['/navbar']);
  // }

  // navigateToNavbarPage(id: number) {
  //   this.router.navigate(['/navbar' , id]);
  // }
}
