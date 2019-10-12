import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashComponent } from './dash/dash.component';


@NgModule({
  declarations: [DashComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  exports:[
    
  ]
})
export class DashboardModule { }
