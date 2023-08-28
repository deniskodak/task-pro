import { environment } from './../../../environments/environment';
import { Store } from '@ngrx/store';
import { authActions } from './../../core/store/auth/auth.actions';
import {
  vibrate,
  VibrateStates,
} from './../../shared/animations/vibrate.animation';
import { smoothAppear } from './../../shared/animations/smoth-appear.animation';
import { LinearComponent } from './../../core/layouts/linear/linear.component';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { InputFeedbackComponent } from 'src/app/shared/input-feedback/input-feedback.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LinearComponent,
    RouterModule,
    NgIf,
    InputFeedbackComponent,
  ],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [smoothAppear, vibrate],
})
export class AuthComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient
  ) {}
  isLogin = false;
  form: FormGroup;
  vibrateState = VibrateStates.Inactive;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.isLogin = data['isLogin'];
    });

    this.initForm();
  }

  private initForm() {
    const nameControl = this.isLogin
      ? {}
      : { name: new FormControl('', [Validators.required]) };

    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
      ...nameControl,
    });
  }

  private toggleVibrate() {
    if (this.vibrateState === VibrateStates.Active) return;

    this.vibrateState = VibrateStates.Active;
    setTimeout(() => {
      this.vibrateState = VibrateStates.Inactive;
    }, 300);
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      this.toggleVibrate();
      return;
    }
    const { name, password, email } = this.form.value;
    if (this.isLogin) {
      this.store.dispatch(authActions.loginStart({ email, password }));
    } else {
      this.store.dispatch(authActions.signStart({ name, password, email }));
    }
  }

  getIsFieldInvalid(fieldName) {
    const field = this.form.get(fieldName);
    if (!field) return true;

    return !field.valid && field.touched;
  }
}
