import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { deviceActions, deviceSelectors } from 'src/app/root-store';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { DeviceMeasurementRecord } from 'src/app/shared/models/device/device-measurement-record.model';
import { DeviceMeasurement } from 'src/app/shared/models/device/device-measurement.model';
import { DeviceSummary } from 'src/app/shared/models/device/device-summary.model';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit, OnDestroy {

  deviceForm: FormGroup;
  currentDevice: DeviceSummary | null;
  currentDeviceMeasurments$: Observable<DeviceMeasurement[]>;
  componentActive = true;
  isLoading = false;
  displayColumns = ['thcLevel', 'timestamp', 'notes', 'analyst', 'strain'];

  constructor(
    private store: Store<{}>,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: [{ value: '', disabled: true }, Validators.required],
      description: ['']
    });

    this.route.paramMap.pipe(
        takeWhile(() => this.componentActive)
      ).subscribe(params => {
        const id = params.get('id');
        if (id) {
          this.isLoading = true;
          this.store.dispatch(deviceActions.DeviceDetailsActions.loadDevice({ id }));
        }
      });

    this.store.select(deviceSelectors.selectCurrentDevice).pipe(
      takeWhile(() => this.componentActive)
    ).subscribe(currentDevice => this.displayDevice(currentDevice));

    this.currentDeviceMeasurments$ = this.store.select(deviceSelectors.selectCurrentDeviceMeasurements);
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.deviceForm.controls[controlName].hasError(errorName);
  }

  displayDevice(device: DeviceSummary | null) {
    this.isLoading = false;
    this.currentDevice = device;

    if (this.currentDevice && this.deviceForm) {

      console.log('currentDevice', this.currentDevice);
      // Reset the form back to pristine
      this.deviceForm.reset();

      // Update the data on the form
      this.deviceForm.patchValue({
        name: this.currentDevice.name,
        serialNumber: this.currentDevice.serialNumberLastFour,
        description: this.currentDevice.description
      });
    }
  }

  cancel() {

    this.displayDevice(this.currentDevice);
  }

  save() {
    if (this.deviceForm.valid) {
      if (this.deviceForm.dirty) {
        this.isLoading = true;
        const device = { id: this.currentDevice?.id, ...this.deviceForm.value };

        this.store.dispatch(deviceActions.DeviceDetailsActions.updateDevice({ device }))
      }
    }
  }

  inactivateDevice() {

    if (this.currentDevice) {
      this.store.dispatch(deviceActions.DeviceDetailsActions.inactivateDevice({ deviceId: this.currentDevice.id }));
    }
  }

  activateDevice() {

    if (this.currentDevice) {
      this.store.dispatch(deviceActions.DeviceDetailsActions.activateDevice({ deviceId: this.currentDevice.id }));
    }
  }

  selectTestResult(result: DeviceMeasurement) {

  }

  recordMeasurement(measurement: DeviceMeasurementRecord) {

    this.store.dispatch(deviceActions.DeviceAddResultsActions.recordMeasurement({ measurement }));
  }

}
