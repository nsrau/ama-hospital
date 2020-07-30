import {Injectable} from '@angular/core';
import {CommonService} from './common.service';
import {environment} from '../../../environments/environment';
import {DefinitionsInterface} from '../model';

@Injectable()
export class DefinitionsService {

  definitions: DefinitionsInterface[];

  constructor(
    private commonService: CommonService
  ) {
  }

  getDefinitions() {
    this.definitions = null;
    this.commonService.http().get(`${environment.PARSE_URL}/classes/Definitions?order=name`,
      this.commonService.getHttpOptions())
      .subscribe(
        (res: any) => {
          this.definitions = res.results as DefinitionsInterface[];
        },
        err => {
          console.error(err);
        }
      );
  }

}
