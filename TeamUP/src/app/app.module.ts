import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {BsDropdownModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {HeaderComponent} from './header/header.component';

import {AlertModule} from 'ngx-bootstrap/alert';
import {AppRoutes} from "./app.routes";
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {HomeComponent} from "./home/home.component";
import {UserBasicComponent} from "./userinfo/basic/userbasic.component";
import {UserProfileComponent} from './userinfo/user-profile/user-profile.component';
import {DashboardComponent} from './userinfo/dashboard/dashboard.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {MatchesComponent} from './userinfo/matches/matches.component';
import {NotificationService} from "./notification.service";
import {ChatComponent} from './userinfo/chat/chat.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthService} from "./auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {UserService} from "./userinfo/user.service";
import { ChatCurrentComponent } from './userinfo/chat/chat-current/chat-current.component';
import { ChatsAllComponent } from './userinfo/chat/chats-all/chats-all.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    HeaderComponent,
    PagenotfoundComponent,
    HomeComponent,
    UserBasicComponent,
    UserProfileComponent,
    DashboardComponent,
    MatchesComponent,
    ChatComponent,
    LoginComponent,
    ChatCurrentComponent,
    ChatsAllComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
	  RouterModule.forRoot(
      AppRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),

  ],
  providers: [NotificationService, AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
