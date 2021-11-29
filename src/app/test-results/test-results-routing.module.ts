import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestResultsComponent } from './test-results.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TestResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestResultsRoutingModule { }
