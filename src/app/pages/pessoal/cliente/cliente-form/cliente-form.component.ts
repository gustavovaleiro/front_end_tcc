import { Component, Injector, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { switchMap } from 'rxjs/operators';

import { Cliente } from '../shared/model/cliente.model';
import { ClienteService } from '../shared/service/cliente.service';
import { PessoaFormComponent } from '../../pessoa/pessoa-form/pessoa-form.component';
import { FormGroup } from '@angular/forms';



@Component({

  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css'],
  providers: [
    
    
  ],
})
export class ClienteFormComponent extends BaseResourceFormComponent<Cliente> implements OnInit {
  dateOfBirth: Date;
  @ViewChild(PessoaFormComponent,{static: false}) pessoaComponent: PessoaFormComponent;
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

    });
    
  }
  ngOnInit() {
    super.ngOnInit();
  }

  isValidForm(){
   return this.resourceForm && this.resourceForm.valid &&
   this.pessoaComponent && this.pessoaComponent.resourceForm && this.pessoaComponent.resourceForm.valid
  }
  protected createResource(){
    let  cliente = this.getClienteFromForm();
  
    this.resourceService.create(cliente).subscribe(
      (cliente) =>this.actionsForSuccess(cliente),
      (error) => this.actionsForError(error)
    )
  }
  protected updateResource(){
    let  cliente = this.getClienteFromForm();
    this.resourceService.update(cliente).subscribe(
      (cliente) => this.actionsForSuccess(cliente),
      (error) => this.actionsForError(error)
    )
  }
  private getClienteFromForm(): Cliente{
    let cliente = this.jsonDataToResourceFn(this.resourceForm.value);
    cliente.pessoa = this.pessoaComponent.getPessoa();
    return cliente;
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
