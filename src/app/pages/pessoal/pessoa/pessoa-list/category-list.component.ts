import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../shared/category.service';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { Pessoa } from '../shared/model/pessoa.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent  extends BaseResourceListComponent<Pessoa> {
 
  constructor(private categoryService: CategoryService) { 
    super(categoryService);
  }

}
