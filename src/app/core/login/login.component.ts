import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../shared/services/common.service';

@Component({
  selector: 'ama-login',
  template: `
    <div class="container login-container">
      <div class="row">
        <div class="col-md-6 login-form offset-md-3">
          <h3>Login</h3>
          <form
            [formGroup]="loginForm"
            (ngSubmit)="onSubmit()"
          >
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Username *"
                formControlName="username"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                placeholder="Password *"
                formControlName="password"
              />
            </div>
            <div class="form-group">
              <div class="row">
                <div class="col-md-6">
                  <button
                    type="submit"
                    class="btn btn-primary btn-sm btn-block mt-1"
                  >
                    submit
                  </button>
                </div>

                <div class="col-md-6">
                  <button
                    type="reset"
                    class="btn btn-outline-secondary btn-sm btn-block mt-1"
                  >
                    reset
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: CommonService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['ama.test', Validators.required],
      password: ['ama@test', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const username = this.f.username.value;
    const password = this.f.password.value;

    this.authService.login(username, password);
  }

}
