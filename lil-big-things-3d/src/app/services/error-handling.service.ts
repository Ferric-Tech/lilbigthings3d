import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorModalContent {
  title: string;
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  errorModelObs$: BehaviorSubject<ErrorModalContent> = new BehaviorSubject(
    {} as ErrorModalContent
  );
  errorModalContent = this.errorModelObs$.asObservable();

  handError(error: unknown, message?: unknown): void {
    message ? console.log(error) : console.log(error);
    this.errorModelObs$.next({
      title: 'Something went wrong',
      code: error as string,
      message: message as string,
    });
  }
}
