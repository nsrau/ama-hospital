import {LoginComponent} from '../../core/login/login.component';
import {AppComponent} from '../../app.component';
import {PageNotFoundComponent} from '../../core/page-not-found/page-not-found.component';
import {NotificationComponent} from './notification.component';
import {NavbarComponent} from '../../core/navbar/navbar.component';
import {PatientsComponent} from '../../core/patients/patients.component';
import {PatientSummaryComponent} from '../../core/patients/summary/patient-summary.component';
import {DefinitionsComponent} from '../../core/definitions/definitions.component';
import { LoadingComponent } from './loading.component';

export const LIST_COMPONENTS = [
  AppComponent,
  LoginComponent,
  NavbarComponent,
  NavbarComponent,
  LoadingComponent,
  PatientsComponent,
  PatientsComponent,
  DefinitionsComponent,
  PageNotFoundComponent,
  NotificationComponent,
  PatientSummaryComponent
];
