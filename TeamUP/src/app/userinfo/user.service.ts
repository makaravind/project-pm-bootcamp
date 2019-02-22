import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as io from "socket.io-client";
import {NotificationService} from "../notification.service";

@Injectable()
export class UserService {

  private userSession = null;
  private users = [];
  private socket: SocketIOClient.Socket;

  constructor(private http: HttpClient, private notyService: NotificationService) {
    this.notyService.getConnectWS$().subscribe(m => this.connectWS());
  }

  getSocket() {
    if(!this.socket) {
      this.connectWS();
    }
    return this.socket;
  }

  connectWS() {
    this.socket = io.connect();
    console.log('WS Connected');
    this.socket.emit('new user', {userID: this.getSession().id})
  }

  getSession() {
    return JSON.parse(localStorage.getItem("userSession"));
  }

  getUserAndStoreSession() {
    return this.http.get('/api/auth/getCurrentSession', {});
  }

  getMessageHistory(params) {
    return this.http.post('/api/auth/messages', params);
  }

  getChats() {
    return this.http.get('/api/auth/chats');
  }

  getUsers() {
    return this.http.get('/api/auth/suggestions');
  }

  postLike(params) {
    return this.http.post('/api/auth/like', params);
  }

  postDisLike(params) {
    return this.http.post('/api/auth/dislike', params);
  }

  getMatches() {
    console.log('my macthes');
    return this.http.get('/api/auth/matches');
  }
}
