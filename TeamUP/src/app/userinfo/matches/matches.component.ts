import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {NotyMessage} from "../../models/NotyMessage";

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
    this.userService.getMatches().subscribe(response => {
      if(response['data']) {
        this.users = response['data'];
      }
    });
  }

  initiateChat() {
    console.log('Chat')
  }
}
