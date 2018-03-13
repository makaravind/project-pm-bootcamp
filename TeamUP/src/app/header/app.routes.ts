import { Routes } from '@angular/router';
import {PagenotfoundComponent} from "../pagenotfound/pagenotfound.component";

export const AppRoutes: Routes = [
  { path: '**', component: PagenotfoundComponent }
];

