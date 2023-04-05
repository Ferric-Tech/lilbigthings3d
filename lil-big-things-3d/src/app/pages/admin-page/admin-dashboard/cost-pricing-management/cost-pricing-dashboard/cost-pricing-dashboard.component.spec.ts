import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostPricingManagementComponent } from './cost-pricing-dashboard.component';

describe('CostPricingManagementComponent', () => {
  let component: CostPricingManagementComponent;
  let fixture: ComponentFixture<CostPricingManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CostPricingManagementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CostPricingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
