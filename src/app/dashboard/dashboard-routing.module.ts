import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'test-results',
        loadChildren: () => import('src/app/test-results/test-results.module').then(m => m.TestResultsModule)
      },
      {
        path: 'devices',
        loadChildren: () => import('src/app/devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: 'strains',
        loadChildren: () => import('src/app/strains/strains.module').then(m => m.StrainsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
