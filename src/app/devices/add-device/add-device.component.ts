import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deviceActions } from 'src/app/root-store';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit, OnDestroy {

  deviceForm: FormGroup;
  isLoading = false;
  componentActive = true;

  constructor(
    private fb: FormBuilder,
    private store: Store<{}>,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: ['', Validators.required],
      description: ['']
    });
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  hasError(controlName: string, errorName: string) {
    return this.deviceForm.controls[controlName].hasError(errorName);
  }

  register() {
    this.isLoading = true;
    if(this.deviceForm.valid) {
      
      const registration = { ...this.deviceForm.value };

      this.store.dispatch(deviceActions.DeviceAddActions.registerDevice({ registration }));
    }
  }

}
