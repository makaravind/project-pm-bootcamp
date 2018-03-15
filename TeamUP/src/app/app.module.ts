import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { HeaderComponent } from './header/header.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import {AppRoutes} from "./header/app.routes";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    UserinfoComponent,
    HeaderComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
	RouterModule.forRoot(
      AppRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
