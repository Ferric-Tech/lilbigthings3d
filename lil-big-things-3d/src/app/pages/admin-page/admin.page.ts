import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPageComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    readonly authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log(this.authService.userID);
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}
