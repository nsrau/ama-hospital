import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './core/login/login.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {PatientsComponent} from './core/patients/patients.component';
import {PatientSummaryComponent} from './core/patients/summary/patient-summary.component';
import {DefinitionsComponent} from './core/definitions/definitions.component';

const routes: Routes = [
  {path: '', redirectTo: '/patients', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'patients', component: PatientsComponent, canActivate: [AuthGuardService]},
  {path: 'patients/:id/summary', component: PatientSummaryComponent, canActivate: [AuthGuardService]},
  {path: 'definitions/activities', component: DefinitionsComponent, canActivate: [AuthGuardService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
