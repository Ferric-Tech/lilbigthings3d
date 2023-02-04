/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'lil-big-things-3d';
  app = initializeApp(environment.firebase);
}
