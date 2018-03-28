import { Component, OnInit } from '@angular/core';
import {UserService} from "../userinfo/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'TeamUp';
  caption = 'match-maker for co-founders';

  constructor(private userService: UserService) { }

  ngOnInit() {
  }


  login() {
    this.userService.login();
  }

}
