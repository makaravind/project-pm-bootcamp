import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {NotificationService} from "../../notification.service";
import {NotyMessage} from "../../models/NotyMessage";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../userinfo/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentRouteState = {};

  constructor(private authService: AuthService,
              private notyService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserAndStoreSession();
    this.router.navigateByUrl('/home');
  }

}
