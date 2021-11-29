import { NgModule } from '@angular/core';
import { StrainsRoutingModule } from './strains-routing.module';
import { AddEditStrainComponent } from './add-edit-strain/add-edit-strain.component';
import { StrainsComponent } from './strains.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StrainDetailsComponent } from './strain-details/strain-details.component';
import { MatIconModule } from  '@angular/material/icon';


@NgModule({
  declarations: [
    AddEditStrainComponent,
    StrainsComponent,
    StrainDetailsComponent
  ],
  imports: [
    SharedModule,
    StrainsRoutingModule,
    MatIconModule
  ]
})
export class StrainsModule { }
