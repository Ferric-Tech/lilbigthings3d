import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
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
  displayMenu = false;

  constructor(
    private readonly authService: AuthenticationService,
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

  onMenuClick() {
    this.displayMenu = !this.displayMenu;
  }

  onBasketClick() {
    this.router.navigate(['basket']);

    if (this.basketCount) {
      return;
    }

    this.eventService.publish(
      EventChannel.Navbar,
      EventTopic.ShowEmptyBasketNotice,
      true
    );
  }

  onSignOutClick() {
    this.authService.signOutUser();
  }

  private registerSubscriptions() {
    this.eventService.subscribe(
      EventChannel.Product,
      EventTopic.BasketContentAmended,
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
