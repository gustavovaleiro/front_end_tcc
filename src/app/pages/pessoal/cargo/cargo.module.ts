import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargoRoutingModule } from './cargo-routing.module';
import { CargoFormComponent } from './cargo-form/cargo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CargoListComponent } from './cargo-list/cargo-list.component';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [CargoFormComponent, CargoListComponent],
  imports: [
    SharedModule,
    IMaskModule,
    CargoRoutingModule,
  ]
})
export class CargoModule { }
 