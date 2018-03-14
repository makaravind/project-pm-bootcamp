import { Component, OnInit } from '@angular/core';
import {User} from "../models/User";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  user = new User('', '', '');
  countries = ["Australia","India","USA"];

  constructor() {
    // this.user.firstName = '';
  }

  ngOnInit() {
  }

}
