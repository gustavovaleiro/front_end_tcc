import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';


const routes: Routes = [ {path: '', component: BaseComponent, children:[
                            {path: "categories", loadChildren: "../categories/categories.module#CategoriesModule"}
                          ]},
                            
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
