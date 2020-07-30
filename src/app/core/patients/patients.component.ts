import {Component, OnInit} from '@angular/core';
import {PatientsService} from '../../shared/services/patients.service';
import {PatientsInterface} from '../../shared/model';

@Component({
  selector: 'ama-patients',
  template: `
    <ama-loading *ngIf="!patientsService.patients"></ama-loading>
    <div class="row" *ngIf="patientsService.patients">
      <div class="col-12">

        <div class="card-columns">
          <div class="card"
               *ngFor="let patient of patientsService.patients"
               (click)="openPatient(patient)"
               [hidden]="!patient.show"
               [ngClass]="{
               'border-danger': patient.bmi >= 30,
               'border-warning': patient.bmi >= 25 && patient.bmi <= 29.9,
               'border-success': patient.bmi >= 18.5 && patient.bmi <= 24.9
               }"
          >
            <div class="card-header"
                 [ngClass]="{
                   'male': patient.gender === 'male',
                   'female': patient.gender === 'female'
                 }"
            >{{patient.name}}
            </div>
            <div class="card-body text-primary">
              <ul class="list-group">
                <li class="list-group-item">Birth date: {{patient.birthDate.iso | date:'yyyy-MM-dd'}}</li>
                <li class="list-group-item">Height cm: {{patient.heightCm}}</li>
                <li class="list-group-item">Weight kg: {{patient.weightKg}}</li>
                <li class="list-group-item">BMI: {{patient.bmi}}</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [
      `
      .male {
        background: url("assets/male.jpg") no-repeat top right !important;
        background-size: contain !important;
      }

      .female {
        background: url("assets/female.jpg") no-repeat top right !important;
        background-size: contain !important;
      }

      .card-body {
        padding: 2px;
      }

      .card {
        cursor: pointer;
      }
    `
  ]
})
export class PatientsComponent implements OnInit {

  constructor(
    public patientsService: PatientsService
  ) {
  }

  ngOnInit() {
    this.patientsService.getPatients();
  }

  openPatient(patient: PatientsInterface) {
    this.patientsService.goToSummary(patient);
  }

}
