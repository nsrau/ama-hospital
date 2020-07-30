import { Component, OnInit } from '@angular/core';
import { DefinitionsService } from '../../shared/services/definitions.service';

@Component({
  selector: 'ama-definitions',
  template: `
    <ama-loading *ngIf="!definitionsService.definitions"></ama-loading>

    <div class="row" *ngIf="definitionsService.definitions">

      <div class="col-12">


        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Activity</th>
            <th scope="col">Intensity</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let def of definitionsService.definitions">
            <td>{{def.activity}}</td>
            <td>{{def.intensity}}</td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>

  `,
  styles: []
})
export class DefinitionsComponent implements OnInit {

  constructor(public definitionsService: DefinitionsService) { }

  ngOnInit() {
    this.definitionsService.getDefinitions();
  }

}
