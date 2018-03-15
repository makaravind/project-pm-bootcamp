import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import {AppRoutes} from "./header/app.routes";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import {HomeComponent} from "./home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PagenotfoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    RouterModule.forRoot(
      AppRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
