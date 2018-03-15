import { Component, OnInit } from '@angular/core';
import {User} from "../../models/UserBasics";
import {industryType, industryTypeOf, UserProfile} from "../../models/UserProfile";

@Component({
  selector: 'app-basic',
  templateUrl: './userbasic.component.html',
  styleUrls: ['./userbasic.component.css']
})
export class UserBasicComponent implements OnInit {

  userBasics = new User('', '', '', '', '', '', '');

  constructor() { }

  ngOnInit() {

  }
  saveUserbasicinfo(){
    console.log(this.userBasics);
  }

}
