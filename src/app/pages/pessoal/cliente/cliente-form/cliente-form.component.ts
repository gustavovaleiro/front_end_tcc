import { Component, Injector, OnInit } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { switchMap } from 'rxjs/operators';

import { Cliente } from '../shared/model/cliente.model';
import { ClienteService } from '../shared/service/cliente.service';



@Component({

  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [
    
    
  ],
})
export class ClienteFormComponent extends BaseResourceFormComponent<Cliente> implements OnInit {
  dateOfBirth: Date;

  constructor( 
    protected clienteService: ClienteService,
    protected injector: Injector
  ) {super(injector, new Cliente(), clienteService, Cliente.fromJson)}
  
    
  protected loadResource() {
    if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+params.get("id")))
        ).subscribe(
            (resource) => {
              this.resource = resource;
              this.resourceForm.patchValue(resource); 
            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }
  
  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      limiteCompra: [null],
      descricao:[null],
      pessoa : this.formBuilder.group({})
    });
    
  }
  ngOnInit() {
    super.ngOnInit();
  }
  get formValue(){
    return this.resourceForm.value;
  }

  

  protected creationPageTitle():string{
    return "Cadastro de Novo Cliente"; 
  }

  protected editionPageTitle(): string{
    const name = this.resource.pessoa.nome || ''
    return "Editando Cliente: " + name;
  }
}
