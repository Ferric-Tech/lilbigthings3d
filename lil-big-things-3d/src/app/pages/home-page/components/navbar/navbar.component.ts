import { ChangeDetectorRef, Component } from '@angular/core';
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
export class NavbarComponent {
  basketCount = 0;

  constructor(
    private readonly eventService: EventManagementService,
    private readonly localStorageService: LocalStorageService,
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.setBasketCounter();
    this.registerSubscriptions();
  }

  onLogoClick() {
    this.router.navigate(['']);
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
    let basket: string[] = this.localStorageService.get(
      LocalStorageItem.Basket
    );
    this.basketCount = basket.length;
    console.log(basket);
    console.log(this.basketCount);
    this.cd.detectChanges();
  }
}
