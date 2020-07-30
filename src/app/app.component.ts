import { Component } from '@angular/core';

@Component({
  selector: 'ama-root',
  template: `
    <ama-navbar></ama-navbar>
    <div class="container mt-6">
      <div class="row">
        <div class="col-12">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
    <ama-notification></ama-notification>
  `
})
export class AppComponent {
}
