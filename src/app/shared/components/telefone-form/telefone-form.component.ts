import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import toastr from "toastr"
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import {  GetErrorMessage } from '../form-field-error/error-message';
import { PessoaComplementar } from '../pessoal-complementar-form/pessoal-complementar';
@Component({
  selector: 'app-telefone-form',
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css']
})
export class TelefoneFormComponent extends PessoaComplementar implements OnInit  {

  constructor() { 
    super();
   }

  ngOnInit() {
    super.ngOnInit()
  }

  static groupElement(principal: boolean, formBuilder: FormBuilder){
    return formBuilder.group({ 
      id: [null],
      principal: [principal, [Validators.required]],
      ddd: [null, [Validators.required, Validators.minLength(2)]],
      numero: [null, [Validators.required, Validators.minLength(8)]],
      tipo: [null],

   })
  }
  
  protected createElement(principal: boolean): FormGroup{
    let group =  TelefoneFormComponent.groupElement(principal, this.formBuilder)

    return group;
  }



}
