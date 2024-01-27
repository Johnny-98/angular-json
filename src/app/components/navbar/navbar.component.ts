import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {

  nodeId!: string| null;

  constructor(private route: ActivatedRoute) {};

  ngOnInit(): void { 
    this.route.paramMap.subscribe(paramMap =>{
      this.nodeId= paramMap.get('id');

    })
  }

}
