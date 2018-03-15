import { Component, OnInit } from '@angular/core';
import { User } from '../models/UserBasics';
import { UserProfile } from '../models/UserProfile';
import { industryType } from '../models/UserProfile';
import { industryTypeOf } from '../models/UserProfile';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  constructor() {
    // this.user.firstName = '';
  }

  ngOnInit() {
  }

}
