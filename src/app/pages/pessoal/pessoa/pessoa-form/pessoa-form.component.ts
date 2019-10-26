import { Component, Injector, OnInit, Input } from '@angular/core';

import {  Validators, FormArray, FormGroup, AbstractControl, FormControl } from "@angular/forms"

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
  private lastValidCpf;
  resourceFormEnable: boolean = true;

  constructor( 
    private _adapter: DateAdapter<any>,
    protected pessoaService: PessoaService,
    protected injector: Injector
  ) {super(injector, new PessoaFisica(), pessoaService, PessoaFisica.fromJson)
  

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
    let i: number = 0;
    resource.endereco.forEach(endereco => {
      this.endereco.push(EnderecoFormComponent.groupElement(endereco.principal, this.formBuilder));
      this.endereco.controls[i++].patchValue(endereco);
      setTimeout(() => { this.endereco.controls[0].get('cidade').get('nome').enable(); });
    });
    i=0;
    resource.telefone.forEach(telefone => {
      this.telefone.push(TelefoneFormComponent.groupElement(telefone.principal, this.formBuilder));
      this.telefone.controls[i++].patchValue(telefone);
    });
    i=0;
    resource.email.forEach(email => {
      this.email.push(EmailFormComponent.groupElement(email.principal, this.formBuilder));
      this.email.controls[i++].patchValue(email);
    });
  }

 
  protected buildResourceForm(){
      this.togglePessoaFisica();
       
  }
  ngOnInit() {
    super.ngOnInit();
   
  
  }
''
  togglePessoaJuridica(){
    this.resourceForm = this.pessoaJuridicaFormGroup();
    this.toggleEnableDisableForm(false);
    this.cnpjControl.enable({emitEvent: false}   )
    this.setDocumentSearchAndValidate(this.cnpjControl as FormControl)
  }


  togglePessoaFisica(){
    this.resourceForm = this.pessoaFisicaFormGroup();
    this.toggleEnableDisableForm(false);
    this.cpfControl.enable({emitEvent: false}   )
    this.setDocumentSearchAndValidate(this.cpfControl as FormControl)

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

  private setDocumentSearchAndValidate(control: FormControl) {
    control.valueChanges.subscribe(value => {
       if (control.valid) {// se o controle for valido
         if ( control.value != this.lastValidCpf) {// se o valor atual for diferente do antigo
          control.disable({ emitEvent: false });
           this.pessoaService.getByDocument(control.value).subscribe(pessoa => {          
             this.actionsForGetPessoaInBackEnd(pessoa, control);
           }, error => {
             this.actionsForNotGetPessoaInBack(control);
           });
           this.lastValidCpf = control.value;
         }
         this.enableFormIfNotEnable(control);
       }
       else {
         if (this.resourceFormEnable) {
           this.toggleEnableDisableForm(false);
          control.enable({emitEvent: false}   )
         }
       }
     });
   }
  
  private actionsForNotGetPessoaInBack(control: FormControl) {
    this.resourceForm.reset({tipo: this.resourceForm.get('tipo').value});
    setTimeout(() => { control.setValue(this.lastValidCpf); }, 50);
  }

  private actionsForGetPessoaInBackEnd(pessoa: Pessoa, control: FormControl) {
    this.resourceForm.patchValue(pessoa);
    this.setNaturalidadeIfPessoaFisica(pessoa);
    this.enableFormIfNotEnable(control);
  }

  private setNaturalidadeIfPessoaFisica(pessoa: Pessoa) {
    if (pessoa.getTipo() == TipoPessoa.PESSOAFISICA) {
      setTimeout(() => {
        this.resourceForm.get('naturalidade.nome').enable();
        this.resourceForm.get('naturalidade.nome').setValue((pessoa as PessoaFisica).naturalidade.nome);
      });
    }
  }

  private enableFormIfNotEnable(control: FormControl) {
    if (!this.resourceFormEnable) {
      this.toggleEnableDisableForm(true);
      control.enable({ emitEvent: false });
    }
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

  getPessoa(): Pessoa {
    return this.jsonDataToResourceFn(this.resourceForm.value);
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
}
