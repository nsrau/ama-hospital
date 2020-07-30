import {CommonService} from './common.service';
import {AuthGuardService} from './auth-guard.service';
import {LocalstorageService} from './localstorage.service';
import {NotificationService} from './notification.service';
import {PatientsService} from './patients.service';
import {DefinitionsService} from './definitions.service';

export const LIST_SERVICES = [
  LocalstorageService,
  NotificationService,
  DefinitionsService,
  AuthGuardService,
  PatientsService,
  CommonService
];
