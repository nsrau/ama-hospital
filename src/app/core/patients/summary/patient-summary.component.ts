import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientsService} from '../../../shared/services/patients.service';

@Component({
  selector: 'ama-summary',
  template: `

    <ama-loading *ngIf="!patientsService.summaries?.length"></ama-loading>

    <div class="row" *ngIf="patientsService.summaries?.length > 0">

      <div class="col-12">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page">{{patientsService.currentPatient?.name}}</li>
          </ol>
        </nav>
      </div>

    </div>

    <div class="row" *ngIf="patientsService.summaries?.length > 0">

      <div class="col-12">

        <table class="table table-hover">
          <thead>
          <tr>
            <th scope="col">Activity</th>
            <th scope="col">Intensity</th>
            <th scope="col">Minutes</th>
          </tr>
          </thead>
          <tbody>
          <tr *ngFor="let sum of patientsService.summaries">
            <td>{{sum.activity.activity}}</td>
            <td>{{sum.activity.intensity}}</td>
            <td>{{sum.minutes}}</td>
          </tr>
          </tbody>
        </table>

      </div>

    </div>
  `
})
export class PatientSummaryComponent implements OnInit, OnDestroy {
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    public patientsService: PatientsService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const patientId = params.id;
      this.patientsService.getSummary(patientId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
