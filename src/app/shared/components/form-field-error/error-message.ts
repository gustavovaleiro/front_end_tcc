import { FormControl } from '@angular/forms';

export class GetErrorMessage{
    constructor(){}
    public  getErrorMessage(formControl: FormControl): string {
       
        if( this.mustShowErrorMessage(formControl) )
          return this._getErrorMessage(formControl);
        else
          return null;
      }
    
    
      private mustShowErrorMessage(formControl: FormControl): boolean {
        return formControl.invalid && formControl.touched
      }
    
      private _getErrorMessage(formControl: FormControl): string | null {
        if( formControl.errors.required )
          return "Dado obrigatório";
    
        else if( formControl.errors.email)
          return "Formato de email inválido"

        else if(formControl.errors.cpfCnpjInvalid)
          return "CPF/CNPJ invalido"
    
        else if( formControl.errors.minlength){
          const requiredLength = formControl.errors.minlength.requiredLength;
          return `Deve ter no mínimo ${requiredLength} caracteres`;
        }
    
        else if( formControl.errors.maxlength){
          const requiredLength = formControl.errors.maxlength.requiredLength;
          return `Deve ter no máximo ${requiredLength} caracteres`;
        }
      }
}