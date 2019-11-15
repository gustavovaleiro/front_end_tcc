import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';
import { ExamplecardComponent } from './examplecard/examplecard.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [DashComponent, ExamplecardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
