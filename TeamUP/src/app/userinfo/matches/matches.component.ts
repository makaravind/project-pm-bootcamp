import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  oneAtATime: boolean = true;
  users = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getMatches();
  }

  initiateChat() {
    console.log('Chat')
  }
}
