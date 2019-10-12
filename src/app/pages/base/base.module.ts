import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base/base.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [ BaseComponent],
  imports: [
    BaseRoutingModule,
    CoreModule,
    SharedModule,
    DashboardModule,
  ],
  exports:[
    BaseComponent
  ]
})
export class BaseModule { }
 