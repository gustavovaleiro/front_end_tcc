import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './base/base.component';


const routes: Routes = [ {path: '', component: BaseComponent, children:[
                            {path: "dash", loadChildren:"../dashboard/dashboard.module#DashboardModule"},
                            {path: "clientes", loadChildren: "../pessoal/cliente/cliente.module#ClienteModule"},
                            {path: "fornecedores", loadChildren: "../pessoal/fornecedor/fornecedor.module#FornecedorModule"},
                            {path: "funcionarios", loadChildren: "../pessoal/funcionario/funcionario.module#FuncionarioModule"},
                            {path: "cargos", loadChildren: "../pessoal/cargo/cargo.module#CargoModule"},
                            {path: "categorias", loadChildren: "../estoque/categoria-item/categoria-item.module#CategoriaItemModule"}

                          ]},
                        
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
