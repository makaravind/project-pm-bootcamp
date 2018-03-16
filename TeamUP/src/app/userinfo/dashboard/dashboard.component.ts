import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Output() isImplemented: EventEmitter<any> = new EventEmitter();

  panelClass: String = 'panel';
  oneAtATime: boolean = true;

  users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  onLike(user) {
    console.log('liked');
    this.isImplemented.emit(false)
  }

  onDislike() {
    console.log('disliked');
  }
}
