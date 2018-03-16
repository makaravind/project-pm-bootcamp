import { Component, OnInit } from '@angular/core';
import {User} from "../../models/UserBasics";
import {industryType, industryTypeOf, UserProfile} from "../../models/UserProfile";
import { Router } from '@angular/router';
import { Command } from 'protractor';

@Component({
  selector: 'app-basic',
  templateUrl: './userbasic.component.html',
  styleUrls: ['./userbasic.component.css']
})
export class UserBasicComponent implements OnInit {

  userBasics = new User('', '', '', '', '', '', '');

  constructor(private router:Router) { }

  ngOnInit() {

  }
  saveUserbasicinfo(){
    console.log(this.userBasics);
    // var that = this;
    // setTimeout(function(){
    // that.router.navigate(['/user','profile'])
    // },500);
    // }

    setTimeout(() => {
      this.router.navigate(['/user','profile'])
    },500);
  }
}
