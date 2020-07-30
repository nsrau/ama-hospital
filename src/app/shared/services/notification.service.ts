import {EventEmitter} from '@angular/core';

export class NotificationService {
  notifier = new EventEmitter<{ text: string, type: string }>();

  constructor() {
  }

  private notify(message: string, typeMessage: string): void {
    this.notifier.emit({text: message, type: typeMessage});
  }

  public notifyError(message: string): void {
    this.notify(message, 'ERROR');
  }

  public notifyWarning(message: string): void {
    this.notify(message, 'WARNING');
  }

  public notifyInfo(message: string): void {
    this.notify(message, 'INFO');
  }
}
