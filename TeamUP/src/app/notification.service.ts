import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";
import {NotyMessage} from "./models/NotyMessage";

@Injectable()
export class NotificationService {

  private gotError = new Subject();

  constructor() { }

  getErrorObserver() {
    return this.gotError;
  }

  emitError(message: NotyMessage) {
    this.gotError.next(message);
  }
}
