import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AuthStoreModule } from './auth-store/auth-store.module';
import { DeviceStoreModule } from './device-store/device-store.module';
import { StrainStoreModule } from './strain-store/strains-store.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'SelectiveLabs-WebApp',
      maxAge: 25,
      logOnly: environment.production
    }),
    AuthStoreModule,
    DeviceStoreModule,
    StrainStoreModule
  ]
})
export class RootStoreModule { }
