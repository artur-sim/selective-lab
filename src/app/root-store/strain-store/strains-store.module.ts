import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromStrains from './strains.reducer';
import { EffectsModule } from '@ngrx/effects';
import { strainEffects } from './effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromStrains.strainFeatureKey, fromStrains.reducer),
    EffectsModule.forFeature(strainEffects)
  ]
})
export class StrainStoreModule { }
