import {Component, OnInit} from '@angular/core';
import {User} from "../../models/UserBasics";
import {Router} from '@angular/router';
import {NotificationService} from "../../notification.service";
import {NotyMessage} from "../../models/NotyMessage";

@Component({
  selector: 'app-basic',
  templateUrl: './userbasic.component.html',
  styleUrls: ['./userbasic.component.css']
})
export class UserBasicComponent implements OnInit {

  userBasics = new User('', '', '', '', '', '', '');

  constructor(private router:Router, private notyService: NotificationService) { }

  ngOnInit() {
    const _message: NotyMessage = new NotyMessage('user is invalid', 'alert-danger');
    this.notyService.getErrorObserver().next(_message);
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
