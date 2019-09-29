import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { BaseComponent } from './base/base.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [ BaseComponent],
  imports: [
    BaseRoutingModule,
    CoreModule,
    SharedModule,
  ],
  exports:[
    BaseComponent
  ]
})
export class BaseModule { }
 