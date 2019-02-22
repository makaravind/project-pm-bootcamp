import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UserinfoComponent} from "./userinfo/userinfo.component";
import {PagenotfoundComponent} from "./pagenotfound/pagenotfound.component";
import {UserBasicComponent} from "./userinfo/basic/userbasic.component";
import {UserProfileComponent} from "./userinfo/user-profile/user-profile.component";
import {ChatComponent} from "./userinfo/chat/chat.component";
import {MatchesComponent} from "./userinfo/matches/matches.component";
import {DashboardComponent} from "./userinfo/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";

export const AppRoutes: Routes = [
  {
    path: 'login', component: LoginComponent,
    children: [
      {path: '', component: LoginComponent},
    ]
  },
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
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
      {
        path: 'chat',
        component: ChatComponent
      }
    ]

  },
  {path: '**', component: PagenotfoundComponent}
];

