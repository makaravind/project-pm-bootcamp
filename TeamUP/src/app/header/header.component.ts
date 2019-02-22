import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../notification.service";
import {NotyMessage} from "../models/NotyMessage";
import {UserService} from "../userinfo/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSession;
  gotMessage: Boolean = false;
  notyMessage: NotyMessage;

  constructor(private notyService: NotificationService, private userService: UserService){
  }

  ngOnInit(): void {
    this.notyService.getErrorObserver().subscribe((message: NotyMessage) => {
      this.gotMessage = true;
      this.notyMessage = message;
      setTimeout(() => {
        this.gotMessage = false;
      },2000)
    });

    this.userService.getUserAndStoreSession()
      .subscribe(res => {
        //this.session.setSession(res.user);
        if (res['user'] != null) {
          localStorage.setItem('userSession', JSON.stringify(res['user']));
          this.userSession = res['user'];
          this.notyService.emitConnectWS$();
        }
      });
  }

  ngOnDestroy(): void {
  }
}
