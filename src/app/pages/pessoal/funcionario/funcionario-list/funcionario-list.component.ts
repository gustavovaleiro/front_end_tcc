import { Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { FuncionarioService } from '../shared/service/funcionario.service';
import { Funcionario, FuncionarioListDTO } from '../shared/model/funcionario.model';



@Component({
  selector: 'app-funcionario-list',
  templateUrl: './funcionario-list.component.html',
  styleUrls: ['./funcionario-list.component.css'],

})
export class FuncionarioListComponent extends BaseResourceListComponent<Funcionario, FuncionarioListDTO> {
   
  constructor(private funcionarioService: FuncionarioService) { 
      super(funcionarioService);
  }
  
}
