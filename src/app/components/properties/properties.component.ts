
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  nodeId!: string| null;

  constructor(private route: ActivatedRoute) {};

  ngOnInit(): void { 
    this.route.paramMap.subscribe(paramMap =>{
      this.nodeId= paramMap.get('id');

    })
  }
}
