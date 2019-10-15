import { Component, Injector, OnInit } from '@angular/core';

import {  Validators, FormArray } from "@angular/forms"

import { CategoryService } from '../shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { PessoaFisica, Pessoa, TipoPessoa } from '../shared/model/pessoa.model';

import { ESTADOS } from 'src/app/shared/models/municipios.dados';
import {MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({

  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
  providers: [
    
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Pessoa> implements OnInit {
  dateOfBirth: Date;

  constructor( 
    private _adapter: DateAdapter<any>,
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {super(injector, new PessoaFisica(), categoryService, PessoaFisica.fromJson)}
  
  protected buildResourceForm(){
    this.togglePessoaFisica();
  }

  togglePessoaFisica(){
    super.resourceForm = this.formBuilder.group({
      id: [null],
      tipo: [TipoPessoa.PESSOAFISICA, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(8)]],
      CPF: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required] ],
      naturalidade: this.formBuilder.group({
        id: [null],
        nome: [null],
        estado: [null]
      }),
      nacionalidade: [null],
      rG: this.formBuilder.group({
        emissor: [null],
        uf: [null],
        rg: [null]
      }),
      endereco: this.formBuilder.array([ // for arrai
        this.createEndereco()
      ])
    });
    
    this.endereco.push(this.createEndereco());
  }

  private createEndereco(): any {
    return this.formBuilder.group({
      rua: [null]
    });
  }

  get endereco() {
    return this.resourceForm.get('endereco') as FormArray;
  }


  togglePessoaJuridica(){

    super.resourceForm = this.formBuilder.group({
      id: [null],
      tipo: [TipoPessoa.PESSOAFISICA, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(8)]],
      CNPJ: [null],
      razaoSocial: [null],
      inscricaoEstadual: [null],
      inscricaoMunicipal: [null]
    });
  }
  ngOnInit() {
    super.ngOnInit();
  }
  protected creationPageTitle():string{
    return "Cadastro de Nova Categoria"; 
  }

  protected editionPageTitle(): string{
    const categoryName = this.resource.nome || ''
    return "Editando Categoria: " + categoryName;
  }
}
