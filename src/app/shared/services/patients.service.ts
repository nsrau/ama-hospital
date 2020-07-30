import {Injectable} from '@angular/core';
import {PatientsInterface, SummaryInterface} from '../model';
import {environment} from '../../../environments/environment';
import {CommonService} from './common.service';
import {forkJoin} from 'rxjs';

@Injectable()
export class PatientsService {

  patients: PatientsInterface[];
  summaries: SummaryInterface[];
  currentPatient: PatientsInterface;

  constructor(
    private commonService: CommonService
  ) {
    this.onSearchInputNavBar();
  }

  private onSearchInputNavBar() {
    this.commonService.searchInputValue$
      .subscribe(
        res => {
          if (res) {
            if (this.patients && this.patients.length > 0) {
              this.patients.forEach((p, i) => {
                this.patients[i].show = p.name.toLowerCase().indexOf(res.toLowerCase()) >= 0;
              });
            }
          } else if (this.patients) {
            this.patients.map(p => p.show = true);
          }
        }
      );
  }

  getPatients() {
    // this.createMassiveSummary();
    this.commonService.http().get(`${environment.PARSE_URL}/classes/Patients?order=name`,
      this.commonService.getHttpOptions())
      .subscribe(
        (res: any) => {
          this.patients = res.results as PatientsInterface[];
          this.patients.map(p => p.show = true);
        },
        err => {
          this.commonService.notificationService().notifyError(err.error.error);
        }
      );
  }

  goToSummary(patient: PatientsInterface) {
    if (!this.currentPatient || this.currentPatient.objectId !== patient.objectId) {
      this.currentPatient = patient;
    }
    this.summaries = [];
    this.commonService.router().navigate(['/patients', patient.objectId, 'summary']);
  }

  getSummary(patientId: string) {
    const and = '&include=activity,patient';
    const url = `/classes/Summary?where={"patient":{"__type":"Pointer","className":"Patients","objectId":"${patientId}"}}`;
    this.commonService.http().get(`${environment.PARSE_URL}${url}${and}`,
      this.commonService.getHttpOptions())
      .subscribe(
        (res: any) => {
          this.summaries = res.results as SummaryInterface[];
          if (!this.currentPatient) {
            this.currentPatient = this.summaries[0].patient;
          }
        },
        err => {
          this.commonService.notificationService().notifyError(err.error.error);
        }
      );
  }

  createMassivePatient() {
    const listPatients = [
      {
        id: 1,
        name: 'Gregor van Vloten',
        gender: 'male',
        birthDate: '1986-05-09',
        heightCm: 193,
        weightKg: 69.6,
        bmi: 18.6
      },
      {
        id: 2,
        name: 'Susanne Marcil',
        gender: 'female',
        birthDate: '1984-11-18',
        heightCm: 159,
        weightKg: 102.8,
        bmi: 40.6
      },
      {
        id: 3,
        name: 'Söröss Madarász',
        gender: 'female',
        birthDate: '1979-07-28',
        heightCm: 156,
        weightKg: 47.5,
        bmi: 19.5
      },
      {
        id: 4,
        name: 'Martin Eriksen',
        gender: 'male',
        birthDate: '1978-11-09',
        heightCm: 182,
        weightKg: 163.5,
        bmi: 49.3
      },
      {
        id: 5,
        name: 'Jennifer Dixon',
        gender: 'female',
        birthDate: '1987-12-13',
        heightCm: 159,
        weightKg: 64,
        bmi: 25.3
      },
      {
        id: 6,
        name: 'Matthew Thornton',
        gender: 'male',
        birthDate: '1988-06-17',
        heightCm: 177,
        weightKg: 83.3,
        bmi: 26.5
      },
      {
        id: 7,
        name: 'Tom Brady',
        gender: 'male',
        birthDate: '1992-03-22',
        heightCm: 179,
        weightKg: 85.2,
        bmi: 26.5
      },
      {
        id: 8,
        name: 'Harrison Abbott',
        gender: 'male',
        birthDate: '1993-10-27',
        heightCm: 172,
        weightKg: 80,
        bmi: 27
      },
      {
        id: 9,
        name: 'Mollie Jordan',
        gender: 'female',
        birthDate: '1980-02-15',
        heightCm: 175,
        weightKg: 61.2,
        bmi: 19.9
      },
      {
        id: 10,
        name: 'Toby Simpson',
        gender: 'male',
        birthDate: '1988-01-08',
        heightCm: 168,
        weightKg: 62,
        bmi: 21.9
      },
      {
        id: 11,
        name: 'Katherine Wyatt',
        gender: 'female',
        birthDate: '1976-08-02',
        heightCm: 169,
        weightKg: 56.3,
        bmi: 19.7
      },
      {
        id: 12,
        name: 'Shannon Foster',
        gender: 'female',
        birthDate: '1986-08-21',
        heightCm: 171,
        weightKg: 62.4,
        bmi: 21.3
      }
    ];

    let requests = [];

    listPatients.forEach(p => {

      const param = {
        name: p.name,
        gender: p.gender,
        birthDate: {__type: 'Date', iso: new Date(p.birthDate)},
        heightCm: p.heightCm,
        weightKg: p.weightKg,
        bmi: p.bmi
      };
      const request = this.commonService.http().post(`${environment.PARSE_URL}/classes/Patients`,
        JSON.stringify(param), this.commonService.getHttpOptions());
      requests = [request, ...requests];
    });

    forkJoin(requests).subscribe(results => {
      console.log(results);
    });
  }

  createMassiveDefinitions() {
    const definitions = [
      {
        activity: 'sleeping',
        intensity: 'none'
      },
      {
        activity: 'stationary-awake',
        intensity: 'low'
      },
      {
        activity: 'walking',
        intensity: 'moderate'
      },
      {
        activity: 'cycling',
        intensity: 'moderate'
      },
      {
        activity: 'swimming',
        intensity: 'vigorous'
      },
      {
        activity: 'running',
        intensity: 'vigorous'
      }
    ];

    let requests = [];

    definitions.forEach(d => {

      const param = {
        activity: d.activity,
        intensity: d.intensity
      };
      const request = this.commonService.http().post(`${environment.PARSE_URL}/classes/Definitions`,
        JSON.stringify(param), this.commonService.getHttpOptions());
      requests = [request, ...requests];
    });

    forkJoin(requests).subscribe(results => {
      console.log(results);
    });

  }

  createMassiveSummary() {
    const summary = [
        {
          activity: 'sleeping',
          minutes: 480
        },
        {
          activity: 'walking',
          minutes: 30
        },
        {
          activity: 'stationary-awake',
          minutes: 900
        },
        {
          activity: 'cycling',
          minutes: 30
        }
      ]
    ;

    let requests = [];

    summary.forEach(s => {

      const activity = s.activity;
      let activityId;

      switch (activity) {
        case 'sleeping':
          activityId = 'SxZ1Tcy83E';
          break;
        case 'stationary-awake':
          activityId = 'IZrfM3uunF';
          break;
        case 'walking':
          activityId = '2ZGJHu0UQW';
          break;
        case 'cycling':
          activityId = 'Jk0WkWfjQ1';
          break;
        case 'swimming':
          activityId = 'sabVkrmqyp';
          break;
        case 'running':
          activityId = 'Clx3MlLA7j';
          break;
      }

      const param = {
        activity: {
          className: 'Definitions',
          objectId: activityId,
          __type: 'Pointer'
        },
        minutes: s.minutes,
        patient: {
          className: 'Patients',
          objectId: 'nnZ3LYEktR',
          __type: 'Pointer'
        }
      };
      const request = this.commonService.http().post(`${environment.PARSE_URL}/classes/Summary`,
        JSON.stringify(param), this.commonService.getHttpOptions());
      requests = [request, ...requests];
    });

    forkJoin(requests).subscribe(results => {
      console.log(results);
    });

  }

}
