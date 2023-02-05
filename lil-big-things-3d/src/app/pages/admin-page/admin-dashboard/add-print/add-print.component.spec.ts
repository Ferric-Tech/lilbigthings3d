import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrintComponent } from './add-print.component';

describe('AddPrintComponent', () => {
  let component: AddPrintComponent;
  let fixture: ComponentFixture<AddPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
