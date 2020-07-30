import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ama-page-not-found',
  template: `
    <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">

      <main role="main" class="inner cover">
        <h1 class="cover-heading">Page not found!</h1>
        <p class="lead">Lorem ipsum dolor sit amet, raesentium repellendus, sed sequi. Deleniti distinctio placeat tenetur voluptate.</p>
        <p class="lead">
          <a href="#" [routerLink]="['/patients']" class="btn btn-lg btn-secondary">back</a>
        </p>
      </main>

    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
