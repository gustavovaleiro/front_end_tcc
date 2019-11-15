import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Cargo } from '../shared/model/cargo.model';
import { CargoService } from '../shared/service/cargo.service';

@Component({
  selector: 'app-cargo-list',
  templateUrl: './cargo-list.component.html',
  styleUrls: ['./cargo-list.component.css']
})
export class CargoListComponent  extends BaseResourceListComponent<Cargo, Cargo> {
   
  constructor(private cargo: CargoService) { 
      super(cargo);
  }
  
}