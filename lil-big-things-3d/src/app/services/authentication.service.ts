/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { ErrorHandlingService } from './error-handling.service';

export enum LoginError {
  UserNotFound = 'auth/user-not-found',
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  auth = getAuth();

  constructor(private readonly errorService: ErrorHandlingService) {}

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

  signInWithEmail(email: string, password: string): void {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        this.handleError(error);
      });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleError(error: any): void {
    Object.values(LoginError).includes(error.code)
      ? this.emitError(error.code)
      : this.emitError(error.code, error.message);
  }

  private emitError(error: unknown, message?: string): void {
    message
      ? this.errorService.handError(error, message)
      : this.errorService.handError(error);
  }
}
