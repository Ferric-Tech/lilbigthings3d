import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrintFileComponent } from './add-print-file.component';

describe('AddPrintComponent', () => {
  let component: AddPrintFileComponent;
  let fixture: ComponentFixture<AddPrintFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPrintFileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPrintFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
