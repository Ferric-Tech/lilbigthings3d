/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  ErrorAdditionalDetail,
  ErrorContext,
  ErrorHandlingService,
  ErrorState,
} from './error-handling/error-handling.service';

export enum SignInContext {
  Admin,
  General,
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = getAuth();

  constructor(
    private readonly errorService: ErrorHandlingService,
    private readonly router: Router
  ) {}

  get userID(): string | null {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        return user.uid;
      }
      return null;
    });
    // User is signed out
    // ...
    return null;
  }

  signUpWithEmail(email: string, password: string): void {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  signInWithEmail(
    context: SignInContext,
    email: string,
    password: string
  ): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        switch (context) {
          case SignInContext.Admin:
            this.router.navigate(['admin/dashboard']);
            break;
          case SignInContext.General:
            this.router.navigate(['']);
        }
      })
      .catch((error: { code: unknown; message: unknown }) => {
        this.handleError(error, { email });
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any, detail: ErrorAdditionalDetail): void {
    Object.values(ErrorState).includes(error.code)
      ? this.errorService.handleDefinedError(error.code, {
          email: detail.email,
        })
      : this.errorService.handleUndefinedError(
          ErrorContext.AdminLogin,
          error.code,
          error.message
        );
  }
}
