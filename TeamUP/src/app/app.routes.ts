import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserinfoComponent} from "./userinfo/userinfo.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {UserBasicComponent} from "./userinfo/basic/userbasic.component";
import {UserProfileComponent} from "./userinfo/user-profile/user-profile.component";

export const AppRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'user',
    component: UserinfoComponent,
    children: [
      {
        path: 'basic',
        component: UserBasicComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      }
    ]
    
  },
  { path: '**', component: PagenotfoundComponent }
];

