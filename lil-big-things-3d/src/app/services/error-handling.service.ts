import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ErrorModalContent,
  OptionActionType,
} from '../modals/error-modal/error-modal.component';

export enum ErrorContext {
  AdminLogin = 'Admin login',
}

export enum ErrorState {
  // Firebase standard
  UserNotFound = 'auth/user-not-found',
  // Follow up
  RegistrationAsUserRequiredFirst = 'registration-as-user-required',
}

export interface ErrorAdditionalDetail {
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  errorModelObs$: BehaviorSubject<ErrorModalContent> = new BehaviorSubject(
    {} as ErrorModalContent
  );
  errorModalContent = this.errorModelObs$.asObservable();

  handleDefinedError(error: ErrorState, detail?: ErrorAdditionalDetail): void {
    let errorContent = {} as ErrorModalContent;
    switch (error) {
      case ErrorState.UserNotFound:
        errorContent = {
          title: 'Email not registed',
          subtitle: detail ? detail.email : '',
          message:
            'It seems the email provided is incorrect - are you sure this is correct (including spelling)?',
          options: [
            {
              description: "Yes, I'm sure",
              action: {
                type: OptionActionType.EmitError,
                followUpError: ErrorState.RegistrationAsUserRequiredFirst,
              },
            },
            {
              description: 'No, let me re-enter',
              action: { type: OptionActionType.Close },
            },
          ],
        };
    }

    this.errorModelObs$.next(errorContent);
  }

  handleUndefinedError(
    context: ErrorContext,
    errorCode: unknown,
    errorMessage: unknown
  ): void {
    console.log(context);
    console.log(errorCode);
    console.log(errorMessage);
  }
}
