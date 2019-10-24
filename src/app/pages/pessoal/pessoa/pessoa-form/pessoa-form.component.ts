import { Component, Injector, OnInit, Input } from '@angular/core';

import {  Validators, FormArray, FormGroup, AbstractControl } from "@angular/forms"

import {  PessoaService } from '../shared/pessoa.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { PessoaFisica, Pessoa, TipoPessoa } from '../shared/model/pessoa.model';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { switchMap } from 'rxjs/operators';
import { EnderecoFormComponent } from 'src/app/shared/components/endereco-form/endereco-form.component';
import { TelefoneFormComponent } from 'src/app/shared/components/telefone-form/telefone-form.component';
import { EmailFormComponent } from 'src/app/shared/components/email-form/email-form.component';
import { CpfCnpjValidator } from 'src/app/shared/services/cpf-cnpj.validators';


export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({

  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
  providers: [
    
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    
  ],
})
export class PessoaFormComponent extends BaseResourceFormComponent<Pessoa> implements OnInit {
  dateOfBirth: Date;
  private carregouPessoa = {lastCpf:"", carregou:false };
  resourceFormEnable: boolean = true;
  @Input() resourceForm: FormGroup;
  constructor( 
    private _adapter: DateAdapter<any>,
    protected pessoaService: PessoaService,
    protected injector: Injector
  ) {super(injector, new PessoaFisica(), pessoaService, PessoaFisica.fromJson)
    super.resourceForm = this.resourceForm;
  }
  
    
  protected loadResource() {
    if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+params.get("id")))
        ).subscribe(
            (resource) => {
              
                this.carregaRecurso(resource); 
                
            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    }
  }

  private carregaRecurso(resource: Pessoa) {
    this.resource = resource;
    if (resource.getTipo() == TipoPessoa.PESSOAFISICA) {
      this.togglePessoaFisica();
    }
    else {
      this.togglePessoaJuridica();
    }
    this.resourceForm.patchValue(resource);
    resource.endereco.forEach(endereco => {
      this.endereco.push(EnderecoFormComponent.groupElement(endereco.principal, this.formBuilder));
      this.endereco.controls[0].patchValue(endereco);
      setTimeout(() => { this.endereco.controls[0].get('cidade').get('nome').enable(); });
    });
    resource.telefone.forEach(telefone => {
      this.telefone.push(TelefoneFormComponent.groupElement(telefone.principal, this.formBuilder));
      this.telefone.controls[0].patchValue(telefone);
    });
    resource.email.forEach(email => {
      this.email.push(EmailFormComponent.groupElement(email.principal, this.formBuilder));
      this.email.controls[0].patchValue(email);
    });
  }

  get endereco() {
    return this.resourceForm.get('endereco') as FormArray;
  }
  get telefone() {
    return this.resourceForm.get('telefone') as FormArray;
  }
  get email() {
    return this.resourceForm.get('email') as FormArray;
  }
  protected buildResourceForm(){
      this.togglePessoaFisica();
       
  }
  ngOnInit() {
    super.ngOnInit();
  }
  togglePessoaJuridica(){
    this.resourceForm = this.pessoaJuridicaFormGroup();
    this.toggleEnableDisableForm(false);
    this.cnpjControl.enable({emitEvent: false}   )
    this.setDocumentSearchAndValidate(this.cnpjControl)
  }


  togglePessoaFisica(){
    this.resourceForm = this.pessoaFisicaFormGroup();
    this.toggleEnableDisableForm(false);
    this.cpfControl.enable({emitEvent: false}   )
    this.setDocumentSearchAndValidate(this.cpfControl)
  }

  toggleEnableDisableForm(enable: boolean){
    if(enable){
      this.resourceFormEnable = true;
      this.resourceForm.enable();
   
    }else{
      this.resourceFormEnable = false;
      this.resourceForm.disable();
   
    }
  }

  private setDocumentSearchAndValidate(control: AbstractControl) {
    control.statusChanges.subscribe(value => {
       if (control.valid) {
         if (!this.resourceFormEnable) {
           this.toggleEnableDisableForm(true);
           control.enable();
         }
         if (!this.carregouPessoa.carregou &&control.value != this.carregouPessoa.lastCpf) {
          control.disable({ emitEvent: false });
           this.pessoaService.getByDocument(control.value).subscribe(pessoa => {
             this.resourceForm.patchValue(pessoa);
            control.enable({ emitEvent: false });
           }, error => {
            control.enable({ emitEvent: false });
             this.resourceForm = this.pessoaFisicaFormGroup();
            control.setValue(this.carregouPessoa.lastCpf);
           });
           this.carregouPessoa.carregou = true;
           this.carregouPessoa.lastCpf =control.value;
         }
       }
       else {
         if (this.resourceFormEnable) {
           this.toggleEnableDisableForm(false);
          control.enable({emitEvent: false}   )
         }
         this.carregouPessoa.carregou = false;
       }
     });
   }
  get naturalidadeCidade(){
    return  this.resourceForm.get('naturalidade').get('nome')
  }
  get cpfControl(){
    return this.resourceForm.get('cpf')
  }
  get cnpjControl(){
    return this.resourceForm.get('cnpj')
  }
  get editMode(){
    return this.currentAction == "edit"
  }
  get formValue(){
    return this.resourceForm.value;
  }

  
  protected creationPageTitle():string{
    return "Cadastro de Nova Categoria"; 
  }

  protected editionPageTitle(): string{
    const categoryName = this.resource.nome || ''
    return "Editando Categoria: " + categoryName;
  }

  pessoaFisicaFormGroup(){
    return this.formBuilder.group({
      id: [null],
      tipo: [TipoPessoa.PESSOAFISICA, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(8)]],
      cpf: [null, [Validators.required, CpfCnpjValidator.validate]],
      dataNascimento: [null, [Validators.required] ],
      naturalidade: this.formBuilder.group({
        id: [null],
        nome: [null],
        estado: [null]
      }),
      nacionalidade: [null],
      rg: this.formBuilder.group({
        emissor: [null],
        uf: [null],
        rg: [null]
      }),
      telefone: this.formBuilder.array([]),
      email: this.formBuilder.array([]),
      endereco: this.formBuilder.array([])
    });
  }

  pessoaJuridicaFormGroup(){
    return this.formBuilder.group({
      id: [null],
      tipo: [TipoPessoa.PESSOAFISICA, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(8)]],
      cnpj: [null, [Validators.required, CpfCnpjValidator.validate]],
      razaoSocial: [null],
      inscricaoEstadual: [null],
      inscricaoMunicipal: [null],
      telefone: this.formBuilder.array([]),
      email: this.formBuilder.array([]),
      endereco: this.formBuilder.array([])

    });
  }
}
