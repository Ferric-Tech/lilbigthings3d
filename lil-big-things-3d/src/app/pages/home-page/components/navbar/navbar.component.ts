import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  EventChannel,
  EventTopic,
} from 'src/app/services/event-management/event-management.enum';
import { EventManagementService } from 'src/app/services/event-management/event-management.service';
import { LocalStorageItem } from 'src/app/services/local-storage/local-storage.enum';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  basketCount = 0;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly localStorageService: LocalStorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.router.events.subscribe(() => {
      this.setBasketCounter();
    });
  }

  ngOnInit() {
    this.setBasketCounter();
    this.registerSubscriptions();
  }

  onLogoClick() {
    this.router.navigate(['']);
  }

  onBasketClick() {
    if (this.basketCount) this.router.navigate(['basket']);
  }

  private registerSubscriptions() {
    this.eventService.subscribe(
      EventChannel.Product,
      EventTopic.ProductAddedToBasket,
      () => {
        this.setBasketCounter();
      }
    );
  }

  private setBasketCounter() {
    const basket: string[] = this.localStorageService.get(
      LocalStorageItem.Basket
    );

    if (!basket) {
      this.basketCount = 0;
      return;
    }

    this.basketCount = basket.length;
    this.cd.detectChanges();
  }
}
