import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chats-all',
  templateUrl: './chats-all.component.html',
  styleUrls: ['./chats-all.component.css']
})
export class ChatsAllComponent implements OnInit {

  @Input() chats;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  initiateChat(user) {
    this.router.navigate(['user', 'chat', {whom: user.id}])
  }

}
