import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { Fornecedor } from '../shared/model/fornecedor.model';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { PessoaFormComponent } from '../../pessoa/pessoa-form/pessoa-form.component';
import { FornecedorService } from '../shared/service/fornecedor.service';
import { switchMap } from 'rxjs/operators';
import { Validators, FormArray } from '@angular/forms';

@Component({ 
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.css']
})
export class FornecedorFormComponent extends BaseResourceFormComponent<Fornecedor> implements OnInit {
  enableAdicionaCategoria: boolean = false;
  @ViewChild(PessoaFormComponent,{static: false}) pessoaComponent: PessoaFormComponent;
  constructor( 
    protected service: FornecedorService,
    protected injector: Injector
  ) {super(injector, new Fornecedor(), service, Fornecedor.fromJson)}
  
    
  protected loadResource() {
    if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+params.get("id")))
        ).subscribe(
            (resource) => {
              this.resource = resource;
              console.log(this.resource)
              this.resourceForm.patchValue(resource);
              let i: number = 0;
              resource.categorias.forEach( categoria => {                
                this.adicionaCategoria();
                this.categorias.controls[i++].patchValue(categoria);
              })
              if(this.categorias.controls.length ==0){
                this.adicionaCategoria();
              }
            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }else{
      if(this.categorias.controls.length ==0){
        this.adicionaCategoria();
      }
    }
  }
  private adicionaCategoria() {
    this.categorias.push(this.formBuilder.group({
      id: [null ],
      nome: ['']
    }));
  }

  private excluirCategoria(index: number){
    this.categorias.controls.splice(index,1);
  }

  get categorias(): FormArray{
    return this.resourceForm.get('categorias') as FormArray;
  }

  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      categorias: this.formBuilder.array([])

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
    let  fornecedor = this.getFornecedorFromForm();
  
    this.resourceService.create(fornecedor).subscribe(
      (fornecedor) =>this.actionsForSuccess(fornecedor),
      (error) => this.actionsForError(error)
    )
  }
  protected updateResource(){
    let  fornecedor = this.getFornecedorFromForm();
    this.resourceService.update(fornecedor).subscribe(
      (fornecedor) => this.actionsForSuccess(fornecedor),
      (error) => this.actionsForError(error)
    )
  }
  private getFornecedorFromForm(): Fornecedor{
    let fornecedor = this.jsonDataToResourceFn(this.resourceForm.value);
    fornecedor.pessoa = this.pessoaComponent.getPessoa();
    return fornecedor;
  }

  get formValue(){
    return this.resourceForm.value;
  }

  protected creationPageTitle():string{
    return "Cadastro de Novo Fornecedor"; 
  }

  protected editionPageTitle(): string{
    const name = this.resource.pessoa.nome || ''
    return "Editando Fornecedor: " + name;
  }
}
 