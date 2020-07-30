import {Component, Input, OnInit} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {timer} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {NotificationService} from '../services/notification.service';

@Component({
  selector: 'ama-notification',
  template: `
    <div
      class="snackbar"
      [@snack-visibility]="snackVisibility"
      (click)="snackVisibility = 'hidden'"
    >
      <div class="alert"
           role="alert"
           [ngClass]="{'alert-danger': typeMessage === 'ERROR',
                      'alert-warning': typeMessage === 'WARNING',
                      'alert-info': typeMessage === 'INFO'}"
      >
        <span class="message">
            {{message}}
        </span>
      </div>
    </div>
  `,
  styles: [`
    .snackbar {
      width: 100%;
      text-align: center;
      border-radius: 2px;
      padding: 2px;
      position: fixed;
    }
  `],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        'z-index': '-1',
        top: '-50px'
      })),
      state('visible', style({
        opacity: 1,
        'z-index': '9999',
        top: '0'
      })),
      transition('hidden => visible', animate('200ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class NotificationComponent implements OnInit {
  @Input() durationVisibility = 6000;

  message: string;
  typeMessage: string;
  snackVisibility = 'hidden';

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap(message => {
          this.message = message.text;
          this.typeMessage = message.type;
          this.snackVisibility = 'visible';
        }),
        switchMap(
          message => timer(this.durationVisibility)
        )
      ).subscribe(changeTimer => this.snackVisibility = 'hidden');
  }
}
