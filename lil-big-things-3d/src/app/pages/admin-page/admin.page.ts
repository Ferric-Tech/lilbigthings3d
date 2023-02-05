import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    readonly authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (
      !this.loginForm.controls.email.value ||
      !this.loginForm.controls.password.value
    ) {
      return;
    }
    this.authService.signInWithEmail(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
  }
}
