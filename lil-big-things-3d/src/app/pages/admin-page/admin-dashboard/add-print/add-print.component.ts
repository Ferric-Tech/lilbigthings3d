import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  AuthenticationService,
  SignInContext,
} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-print',
  templateUrl: './add-print.component.html',
  styleUrls: ['./add-print.component.scss'],
})
export class AddPrintComponent {
  addPrintForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', [Validators.required, Validators.minLength(16)]],
  });

  constructor(
    readonly authService: AuthenticationService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (
      !this.addPrintForm.controls.title.value ||
      !this.addPrintForm.controls.description.value
    ) {
      return;
    }
    this.authService.signInWithEmail(
      SignInContext.Admin,
      this.addPrintForm.controls.title.value,
      this.addPrintForm.controls.description.value
    );
  }
}
