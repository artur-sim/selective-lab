import { NgModule } from '@angular/core';

import { TestResultsRoutingModule } from './test-results-routing.module';
import { TestResultsComponent } from './test-results.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    TestResultsComponent
  ],
  imports: [
    SharedModule,
    TestResultsRoutingModule
  ]
})
export class TestResultsModule { }
