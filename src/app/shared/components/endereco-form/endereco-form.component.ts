import { Component, OnInit } from '@angular/core';
import { PessoaComplementar } from '../pessoal-complementar-form/pessoal-complementar';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html', 
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent extends PessoaComplementar implements OnInit  {

  constructor() { 
    super();
   }

  ngOnInit() {
    super.ngOnInit();
  
  }
  static  groupElement( principal: boolean, formBuilder: FormBuilder) : FormGroup{
    return formBuilder.group({ 
      id: [null],
      principal: [principal, [Validators.required]],
      cep: [null, [Validators.required, Validators.minLength(8)]],
      cidade: formBuilder.group({
       nome: [null, [Validators.required]],
       estado: [null, [Validators.required]]
     }),
      numero: [null],
      complemento: [null],
      tipo: [null],
      bairro: [null],
      rua: [null],
   });
  }
  protected createElement(principal: boolean): FormGroup{
    let group =  EnderecoFormComponent.groupElement(principal, this.formBuilder);

    return group;
  }



}
