import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditStrainComponent } from './add-edit-strain/add-edit-strain.component';
import { StrainDetailsComponent } from './strain-details/strain-details.component';
import { StrainsComponent } from './strains.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StrainsComponent 
  },
  {
    path: 'add-edit/:id',
    component: AddEditStrainComponent
  },
  {
    path: 'add-edit',
    component: AddEditStrainComponent
  },
  {
    path: ':id',
    component: StrainDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrainsRoutingModule { }
