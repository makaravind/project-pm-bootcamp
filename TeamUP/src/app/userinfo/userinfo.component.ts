import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
  providers: [UserService]
})
export class UserinfoComponent implements OnInit {

  constructor() {
    // this.user.firstName = '';
  }

  ngOnInit() {
  }
}
