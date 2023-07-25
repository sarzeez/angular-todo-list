import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `<div class="py-5">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card rounded-0">
          <div class="card-header">
            <h3 class="mb-0">Login</h3>
          </div>
          <div class="card-body">
            <form [formGroup]="loginForm" class="form ">
              <div class="form-group">
                <label for="uname1">Username</label>
                <input
                  formControlName="username"
                  type="text"
                  class="form-control rounded-0"
                  [class.is-invalid]="
                    getUsername?.invalid && getUsername?.touched
                  "
                />
                <small
                  [class.d-none]="getUsername?.valid || getUsername?.untouched"
                  class="text-danger"
                  >Username is required</small
                >
              </div>
              <div class="form-group mt-3   ">
                <label>Password</label>
                <input
                  formControlName="password"
                  type="password"
                  class="form-control rounded-0"
                  [class.is-invalid]="
                    getPassword?.invalid && getPassword?.touched
                  "
                />
                <small
                  [class.d-none]="getPassword?.valid || getPassword?.untouched"
                  class="text-danger"
                  >Password is required</small
                >
              </div>
              <button
                type="submit"
                (click)="loginUser()"
                [disabled]="loginForm.invalid"
                class="btn btn-success float-right mt-3"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>`,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  get getUsername() {
    return this.loginForm.get('username');
  }

  get getPassword() {
    return this.loginForm.get('password');
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    const { username, password } = this.loginForm.value;
    this.authService
      .login({
        email: username,
        password,
      })
      .subscribe((res) => {
        const { accessToken } = res;
        this.authService.setSession(accessToken);
        this.router.navigate(['/']);
      });
  }
}
