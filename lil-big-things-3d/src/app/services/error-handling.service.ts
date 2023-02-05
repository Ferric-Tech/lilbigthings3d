import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  handError(error: unknown, message?: unknown): void {
    message ? console.log(error) : console.log(error);
  }
}
