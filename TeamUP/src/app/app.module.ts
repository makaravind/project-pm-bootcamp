import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { HeaderComponent } from './header/header.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import {AppRoutes} from "./app.routes";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {HomeComponent} from "./home/home.component";
import {UserBasicComponent} from "./userinfo/basic/userbasic.component";
import { UserProfileComponent } from './userinfo/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    HeaderComponent,
    PagenotfoundComponent,
    HomeComponent,
    UserBasicComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule,
	  RouterModule.forRoot(
      AppRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
