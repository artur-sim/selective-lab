import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromDevices from './devices.reducer';
import { EffectsModule } from '@ngrx/effects';
import { deviceEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDevices.deviceFeatureKey, fromDevices.reducer),
    EffectsModule.forFeature(deviceEffects)
  ]
})
export class DeviceStoreModule { }
