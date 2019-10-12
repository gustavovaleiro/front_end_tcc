import { Component, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

import { CategoryService } from '../shared/category.service';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { PessoaFisica, Pessoa, TipoPessoa } from '../shared/model/pessoa.model';
import { Calendar } from 'primeng/calendar';
import { ESTADOS } from 'src/app/shared/models/municipios.dados';


@Component({

  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent extends BaseResourceFormComponent<Pessoa> {
  dateOfBirth: Date;
  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }
  constructor( 
    protected categoryService: CategoryService,
    protected injector: Injector
  ) {super(injector, new PessoaFisica(), categoryService, PessoaFisica.fromJson)}
  
  protected buildResourceForm(){
    super.resourceForm = this.formBuilder.group({
      id: [null],
      tipo: [TipoPessoa.PESSOAFISICA, [Validators.required]],
      nome: [null, [Validators.required, Validators.minLength(2)]],
      CPF: [null, [Validators.required]],
      dataNascimento: [null, [Validators.required] ],
      uf:[null],
      naturalidade: [null],
      nacionalidade: [null],
    });
  }


  get estados() : any{
    return ESTADOS.map( estado =>{ return {uf: estado.sigla, nome: estado.nome}})
  }
  protected creationPageTitle():string{
    return "Cadastro de Nova Categoria";
  }

  protected editionPageTitle(): string{
    const categoryName = this.resource.nome || ''
    return "Editando Categoria: " + categoryName;
  }
}
