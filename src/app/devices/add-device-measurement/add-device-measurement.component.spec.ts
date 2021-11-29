import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceMeasurementComponent } from './add-device-measurement.component';

describe('AddDeviceMeasurementComponent', () => {
  let component: AddDeviceMeasurementComponent;
  let fixture: ComponentFixture<AddDeviceMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
