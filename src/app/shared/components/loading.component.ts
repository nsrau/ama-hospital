import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ama-loading',
  template: `
    <div class="row">

      <div class="col-12">
        <h5>loading...</h5>
      </div>

    </div>
  `
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
