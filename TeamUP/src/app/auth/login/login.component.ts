import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {NotificationService} from "../../notification.service";
import {NotyMessage} from "../../models/NotyMessage";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentRouteState = {};

  constructor(private authService: AuthService,
              private notyService: NotificationService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe((params) => {
      console.log('login params ', params);
    });

  }

}
