import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelClass: String = 'panel';
  oneAtATime: boolean = true;

  users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    // console.log('user in dashboard... ', this.user);
    /*this.userService.getUsers().subscribe((response) => {
      console.log(response);
      if(response['data']) {
        this.users = response['data'];
      }
    });*/
  }

  onLike(user) {
    console.log('liked');
  }

  onDislike() {
    console.log('disliked');
  }
}
