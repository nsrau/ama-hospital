import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'ama-navbar',
  template: `
    <div
      class="d-flex fixed-top flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow"
      *ngIf="!router.isActive('login', true)"
    >
      <a href="#"
         class="navbar-brand my-0 mr-md-auto font-weight-normal"
         [routerLink]="['/patients']"
      >AMA App</a>

      <input class="form-control input-nav w-100" type="text" placeholder="Search patients" aria-label="Search"
             [disabled]="!router.isActive('patients', true)"
             (keyup)="handlerChangeSearch($event)"
      >

      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark"
           href="#"
           [routerLink]="['/patients']"
        >Patients</a>
        <a class="p-2 text-dark"
           href="#"
           [routerLink]="['/definitions/activities']"
        >Definitions</a>
      </nav>
      <a class="btn btn-outline-primary"
         href="#"
         (click)="authService.logout()"
      >Logout</a>
    </div>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    public authService: CommonService
  ) {
  }

  ngOnInit() {
  }

  handlerChangeSearch(event: KeyboardEvent) {
    this.authService.handlerChangeSearch(event);
  }


}
