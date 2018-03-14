import { Component, OnInit } from '@angular/core';
import { User } from '../models/UserBasics';
import { UserProfile } from '../models/UserProfile';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  userBasics = new User('', '', '', '', '', '', '');
  userProfile = new UserProfile('', '', '', '', '', '');
  industries = ["Business","Technical","Services"];

  constructor() {
    // this.user.firstName = '';
  }

  ngOnInit() {
  }

}
