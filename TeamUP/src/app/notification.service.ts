import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NotyMessage} from "./models/NotyMessage";

@Injectable()
export class NotificationService {

  private gotError$ = new Subject();
  private connectWS$ = new Subject();

  constructor() { }

  getConnectWS$() {
    return this.connectWS$;
  }

  emitConnectWS$() {
    this.connectWS$.next('connect');
  }

  getErrorObserver() {
    return this.gotError$;
  }

  emitError(message: NotyMessage) {
    this.gotError$.next(message);
  }
}
