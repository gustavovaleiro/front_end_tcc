import { Component, OnInit } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { CategoriaItem } from '../shared/model/categoria-item.model';
import { CategoriaService } from '../shared/service/categoria-item.service';

@Component({
  selector: 'app-categoriaitem-list',
  templateUrl: './categoria-item-list.component.html',
  styleUrls: ['./categoria-item-list.component.css']
})
export class CategoriaItemListComponent  extends BaseResourceListComponent<CategoriaItem, CategoriaItem> {
   
  constructor(private categoriaService: CategoriaService) { 
      super(categoriaService);
      console.log("asdf")
  } 
  
}