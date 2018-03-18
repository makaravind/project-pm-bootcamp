import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class NotificationService {

  private gotError = new Subject();

  constructor() { }

  getErrorObserver() {
    return this.gotError;
  }
}
