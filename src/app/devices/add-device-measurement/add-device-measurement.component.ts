import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceMeasurementRecord } from 'src/app/shared/models/device/device-measurement-record.model';
import { DeviceSummary } from 'src/app/shared/models/device/device-summary.model';
import { StrainListItem } from '../../shared/models/strains/strain-list-item';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-add-device-measurement',
  templateUrl: './add-device-measurement.component.html',
  styleUrls: ['./add-device-measurement.component.scss']
})
export class AddDeviceMeasurementComponent implements OnInit, OnDestroy, OnChanges {

  @Input() currentDevice: DeviceSummary | null;
  @Output() save = new EventEmitter<DeviceMeasurementRecord>();
  deviceMeasurementForm: FormGroup;
  availableStrains$: Observable<StrainListItem[]>;
  isLoading = false;
  componentActive = true;
  selectedStrain: StrainListItem;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private deviceService: DeviceService
  ) { }

  ngOnInit(): void {

    this.availableStrains$ = this.deviceService.getMeasurementStrainList();

    this.deviceMeasurementForm = this.fb.group({
      deviceId: ['', Validators.required],
      potency: [0.00, Validators.required],
      analyst: ['', Validators.required],
      note: [''],
      strainId: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentDevice) {
      const device: any = changes.currentDevice.currentValue as DeviceSummary;
      this.displayDevice(device);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.deviceMeasurementForm.controls[controlName].hasError(errorName);
  }

  displayDevice(device: DeviceSummary | null) {

    if (device && this.deviceMeasurementForm) {
      this.deviceMeasurementForm.reset();

      this.deviceMeasurementForm.patchValue({
        deviceId: device.id
      });
    }
  }

  saveRecord() {
    this.isLoading = true;

    if (this.deviceMeasurementForm.valid) {

      const m = { ...this.deviceMeasurementForm.value };

      this.save.emit(m);
      this.displayDevice(this.currentDevice);
      this.isLoading = false;
    }
  }

}
