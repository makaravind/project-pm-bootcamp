import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "../notification.service";
import {NotyMessage} from "../models/NotyMessage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  gotMessage: Boolean = false;
  notyMessage: NotyMessage;

  constructor(private notyService: NotificationService){
  }

  ngOnInit(): void {
    this.notyService.getErrorObserver().subscribe((message: NotyMessage) => {
      this.gotMessage = true;
      this.notyMessage = message;
      setTimeout(() => {
        this.gotMessage = false;
      },2000)
    });
  }

  ngOnDestroy(): void {
  }
}
