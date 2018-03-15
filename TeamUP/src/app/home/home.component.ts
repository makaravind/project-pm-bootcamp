import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users = [
    {
      fisrtName: 'A',
      about: 'about1',
    },
    {
      fisrtName: 'B',
      about: 'about2',
    },
    {
      fisrtName: 'C',
      about: 'about3',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
