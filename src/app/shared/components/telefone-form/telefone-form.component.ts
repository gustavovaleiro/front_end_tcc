import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import toastr from "toastr"
import { FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import {  GetErrorMessage } from '../form-field-error/error-message';
@Component({
  selector: 'app-telefone-form',
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css']
})
export class TelefoneFormComponent implements OnInit {
  @Input() formBuilder: FormBuilder;
  @Input() telefones: FormArray;
  @Input() private errorMessage;
  constructor() {  }

  ngOnInit() {
    if(this.telefones.length == 0){
      this.adicionarTelefone(true);
    }
  }

  
  private createTelefone(principal: boolean): FormGroup{
    let group =  this.formBuilder.group({
       id: [null],
       principal: [principal, [Validators.required]],
       ddd: [null, [Validators.required, Validators.minLength(2)]],
       numero: [null, [Validators.required, Validators.minLength(8)]],
       tipo: [null],

    })

    return group;
  }

  getErrorMessage(form: FormControl){
    return this.errorMessage.getErrorMessage(form)
  }
  public adicionarTelefone(principal? : boolean){
    if(this.telefones.length < 6)
      this.telefones.push(this.createTelefone(principal? true: false))
    else
    toastr.error("Número Maximo de telefones criados.")
  }

  excluirTelefone(i: number){
    if(this.telefones.length == 1){
      toastr.error("É necessario pelo menos um telefone.")
    }else{
      this.telefones.controls.splice(i, 1);
    }
    
  }

}
