import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthenticationService,
  SignInContext,
} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent {
  @Output() user: EventEmitter<User> = new EventEmitter();

  signInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private readonly authService: AuthenticationService) {}

  async onSignin() {
    const user = await this.authService.signInWithEmail(
      SignInContext.Checkout,
      this.signInForm.get('email')?.value || '',
      this.signInForm.get('password')?.value || ''
    );
    if (!user) return;
    this.user.emit(user);
  }

  onRegisterClick() {
    //TODO
  }
}
