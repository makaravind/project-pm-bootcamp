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

  userBasics = new User('', '', '', '', '', '', '');
  userProfile = new UserProfile('', '', '', '',);
  selectediType:industryType = new industryType(1, 'Business');
  industries = [
    new industryType(1, 'Business' ),
    new industryType(2, 'Technical' ),
    new industryType(3, 'Services' )
 ];
 selectediTypeOf:industryTypeOf = new industryTypeOf(1, 'Business');
  industriesOf = [
    new industryTypeOf(1, 'Business' ),
    new industryTypeOf(2, 'Technical' ),
    new industryTypeOf(3, 'Services' )
 ];

  constructor() {
    // this.user.firstName = '';
  }

  ngOnInit() {
  }

}
