import { Routes } from '@angular/router';
import {UserinfoComponent} from "./userinfo/userinfo.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {UserBasicComponent} from "./userinfo/basic/userbasic.component";
import {UserProfileComponent} from "./userinfo/user-profile/user-profile.component";
import {DashboardComponent} from "./userinfo/dashboard/dashboard.component";
import {MatchesComponent} from "./userinfo/matches/matches.component";

export const AppRoutes: Routes = [
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
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'matches',
        component: MatchesComponent
      },

    ]
  },
  { path: '**', component: PagenotfoundComponent }
];

