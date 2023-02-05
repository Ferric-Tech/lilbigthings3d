import { Component, OnInit } from '@angular/core';
import { ErrorHandlingService } from 'src/app/services/error-handling.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  constructor(private readonly errorService: ErrorHandlingService) {}

  ngOnInit() {
    this.errorService.errorModalContent.subscribe((content) => {
      console.log(content);
    });
  }
}
