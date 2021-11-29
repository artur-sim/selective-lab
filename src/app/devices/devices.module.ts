import { NgModule } from '@angular/core';

import { DevicesRoutingModule } from './devices-routing.module';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DevicesComponent } from './devices.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { AddDeviceMeasurementComponent } from './add-device-measurement/add-device-measurement.component';


@NgModule({
  declarations: [
    AddDeviceComponent,
    DevicesComponent,
    DeviceDetailsComponent,
    AddDeviceMeasurementComponent
  ],
  imports: [
    SharedModule,
    DevicesRoutingModule
  ]
})
export class DevicesModule { }
