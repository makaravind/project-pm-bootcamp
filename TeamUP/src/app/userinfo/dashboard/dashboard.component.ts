import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {NotificationService} from "../../notification.service";
import {NotyMessage} from "../../models/NotyMessage";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelClass: String = 'panel';
  oneAtATime: boolean = true;

  users = [];

  constructor(private userService: UserService, private notyService: NotificationService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((response) => {
      if(response['data']) {
        this.users = response['data'];
      }
    });
  }

  onLike(user) {
    this.userService.postLike({user: user.id}).subscribe(res => {
      this.users = this.users.filter(u => u.id != user.id);
      this.notyService.emitError(new NotyMessage('Liked!', 'success'));
    });
  }

  onDislike() {
    console.log('disliked');
  }
}
