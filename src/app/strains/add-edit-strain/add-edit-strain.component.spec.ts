import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrainComponent } from './add-edit-strain.component';

describe('AddStrainComponent', () => {
  let component: AddStrainComponent;
  let fixture: ComponentFixture<AddStrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
