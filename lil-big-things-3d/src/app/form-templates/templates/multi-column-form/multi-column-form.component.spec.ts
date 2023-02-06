import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiColumnFormComponent } from './multi-column-form.component';

describe('MultiColumnFormComponent', () => {
  let component: MultiColumnFormComponent;
  let fixture: ComponentFixture<MultiColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiColumnFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
