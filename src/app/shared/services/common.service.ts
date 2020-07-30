import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LocalstorageService} from './localstorage.service';
import {environment} from '../../../environments/environment';
import {NotificationService} from './notification.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class CommonService {
  searchInputValue$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _localstorageService: LocalstorageService,
    private _notificationService: NotificationService
  ) {
  }

  http(): HttpClient {
    return this._http;
  }

  router(): Router {
    return this._router;
  }

  handlerChangeSearch(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.searchInputValue$.next(input.value);
  }

  notificationService(): NotificationService {
    return this._notificationService;
  }

  clear(): void {
    return this._localstorageService.ClearAll();
  }

  isAuthenticated(): boolean {
    if (!environment.production) {
      return true;
    }
    return this._localstorageService.Get('sessionToken');
  }

  getSession() {
    if (this.getToken()) {
      this._http.get(`${environment.PARSE_URL}/users/me`, this.getHttpOptions())
        .subscribe(
          (res: any) => {
            this._router.navigate(['/patients']);
          },
          err => {
            console.error(err);
          }
        );
    }
  }

  getHttpOptions(): any {
    let httpOptions = {
      headers: new HttpHeaders({
        'X-Parse-Application-Id': environment.PARSE_APP_ID,
        'X-Parse-REST-API-Key': environment.PARSE_KEY
      })
    };
    if (this.getToken()) {
      httpOptions = {
        headers: new HttpHeaders({
          'X-Parse-Application-Id': environment.PARSE_APP_ID,
          'X-Parse-REST-API-Key': environment.PARSE_KEY,
          'X-Parse-Session-Token': this.getToken()
        })
      };
    }

    return httpOptions;
  }

  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  login(username: string, password: string) {
    this._http.get(`${environment.PARSE_URL}/login?username=${username}&password=${password}`, this.getHttpOptions())
      .subscribe(
        (res: any) => {
          this.setToken(res.sessionToken);
          this._router.navigate(['/patients']);
        },
        (err: HttpErrorResponse) => {
          this._notificationService.notifyError(err.error.error);
        }
      );
  }

  getToken(): string {
    return this._localstorageService.Get('sessionToken');
  }

  setToken(token: string) {
    this._localstorageService.Set('sessionToken', token);
  }

}
