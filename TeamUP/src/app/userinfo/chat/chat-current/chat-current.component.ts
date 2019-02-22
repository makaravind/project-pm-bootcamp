import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-chat-current',
  templateUrl: './chat-current.component.html',
  styleUrls: ['./chat-current.component.css']
})
export class ChatCurrentComponent implements OnInit {

  @Input() messages;
  @Input() me;

  constructor() { }

  ngOnInit() {
    console.log('this.me', this.me);
  }

}
