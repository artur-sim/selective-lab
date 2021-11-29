import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DevicesComponent } from './devices.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DevicesComponent 
  },
  {
    path: 'add',
    component: AddDeviceComponent
  },
  {
    path: ':id',
    component: DeviceDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
