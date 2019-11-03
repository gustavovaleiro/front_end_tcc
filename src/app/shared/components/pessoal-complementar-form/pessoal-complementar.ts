import { OnInit, Input, OnChanges } from '@angular/core';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import toastr from "toastr"

export abstract class PessoaComplementar implements OnInit, OnChanges
{
  @Input() formBuilder: FormBuilder;
  @Input() formArray: FormArray;
  @Input() private errorMessage;
  @Input() nomeElemento: string= '';
  @Input() tamanhoMaximo: number = 3;
  @Input() enable: boolean = true;
  constructor(

  ){}
  
  ngOnChanges(){
    if(this.formArray.length == 0){
      this.adicionarElemento();
    }
    
    this.formArray.controls.forEach(control => {
      if(this.enable)
        control.enable();
      else
        control.disable();
    })
    this.formArray.controls.forEach( control => {
        if(!this.existePrincipal())
          control.get('principal').setValue(true);}
    )

  }
  ngOnInit(){
    if(this.formArray.length == 0){
        this.adicionarElemento();
      }
   
  }
  

  getErrorMessage(form: FormControl){
      return this.errorMessage.getErrorMessage(form)
    }

    public adicionarElemento(){
        
      if(this.formArray.length < this.tamanhoMaximo)
        this.formArray.push(this.createElement(!this.existePrincipal()))
      else
      toastr.error("Número Maximo de "+this.nomeElemento+"s criados.")
    }
    
    private existePrincipal(): boolean{
        return this.formArray.controls.findIndex(fc => fc.get('principal').value==true) !=-1;
    }
    excluirElemento(i: number){
      if(this.formArray.length == 1){
        toastr.error("É necessario pelo menos um "+this.nomeElemento+".")
      }else{
        this.formArray.controls.splice(i, 1);
      }
      
    }

  protected abstract createElement(principal: boolean);
}