import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'TeamUp';
  caption = 'match-maker for co-founders';

  constructor() { }

  ngOnInit() {
  }

}
