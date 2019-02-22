import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private url = 'http://localhost:3000';
  private socket: SocketIOClient.Socket;
  chattingToID: String;
  message: String = '';
  messageHistory = [];
  chats = [];
  me;

  constructor(private userService: UserService, private route: ActivatedRoute) {

    this.me = this.userService.getSession().id;

    this.route.params.subscribe(params => {
      this.chattingToID = params.whom;
      this.socket = userService.getSocket();
    });
  }

  ngOnInit() {
    this.socket.on('new message', (data) => {
      this.messageHistory.push(data);
    });

    this.userService.getMessageHistory({id: this.chattingToID}).subscribe(data => {
      this.messageHistory = [];
      this.messageHistory.push(...data['data']);
    });

    this.userService.getChats().subscribe(data => {
      this.chats = data['data'];
    });
  }

  sendMessage() {
    this.sendValidMessage(this.message, (message) => {
      this.socket.emit('send message', {message: message, to: this.chattingToID});
      this.messageHistory.push({
        message: this.message,
        from: this.me,
        created: Date.now()
      });
      this.message = '';
    });
  }

  sendValidMessage(message, cb) {
    if(message.trim() !== '') {
      cb(message)
    }
  }

}
