import { Component, OnInit } from '@angular/core';
import {industryType, industryTypeOf, UserProfile} from "../../models/UserProfile";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
