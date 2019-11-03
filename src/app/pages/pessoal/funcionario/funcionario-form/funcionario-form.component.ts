import { Component, Injector, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { switchMap } from 'rxjs/operators';

import { PessoaFormComponent } from '../../pessoa/pessoa-form/pessoa-form.component';
import { Validators } from '@angular/forms';
import { Funcionario } from '../../funcionario/shared/model/funcionario.model';
import { FuncionarioService } from '../shared/service/cliente.service';



@Component({

  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.css'],
  providers: [
    
    
  ],
})
export class FuncionarioFormComponent extends BaseResourceFormComponent<Funcionario> implements OnInit {

  imaskConfig={
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
  @ViewChild(PessoaFormComponent,{static: false}) pessoaComponent: PessoaFormComponent;
  constructor( 
    protected funcionarioService: FuncionarioService,
    protected injector: Injector,
  ) {super(injector, new Funcionario(), funcionarioService, Funcionario.fromJson)}
  
    
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
      matricula: [null, Validators.required],
      cargo: this.formBuilder.group({
        id: ['', Validators.required],
        nomeCargo: ['', Validators.required]
      }),
      dataDeAdmissao: [null, Validators.required],
      comissao: [null, Validators.required],
      adicionalPessoal: [null, Validators.required]
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
    let  funcionario = this.getFuncionarioFromForm();
  
    this.resourceService.create(funcionario).subscribe(
      (funcionario) =>this.actionsForSuccess(funcionario),
      (error) => this.actionsForError(error)
    )
  }
  protected updateResource(){
    let  funcionario = this.getFuncionarioFromForm();
    this.resourceService.update(funcionario).subscribe(
      (funcionario) => this.actionsForSuccess(funcionario),
      (error) => this.actionsForError(error)
    )
  }
  private getFuncionarioFromForm(): Funcionario{
    let funcionario = this.jsonDataToResourceFn(this.resourceForm.value);
    funcionario.pessoa = this.pessoaComponent.getPessoa();
    return funcionario;
  }

  get formValue(){
    return this.resourceForm.value;
  }

  protected creationPageTitle():string{
    return "Cadastro de Novo Funcionario"; 
  }

  protected editionPageTitle(): string{
    const name = this.resource.pessoa.nome || ''
    return "Editando Funcionario: " + name;
  }
}
