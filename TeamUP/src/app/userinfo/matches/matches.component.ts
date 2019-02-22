import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {NotyMessage} from "../../models/NotyMessage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  oneAtATime: boolean = true;
  users = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getMatches().subscribe(response => {
      if(response['data']) {
        this.users = response['data'];
      }
    });
  }

  initiateChat(user) {
    this.router.navigate(['user', 'chat', {whom: user.id}])
  }
}
