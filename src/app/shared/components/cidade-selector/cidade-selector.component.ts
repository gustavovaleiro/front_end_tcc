import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ESTADOS, EstadoBase } from '../../models/municipios.dados';

@Component({
  selector: 'app-cidade-selector',
  templateUrl: './cidade-selector.component.html',
  styleUrls: ['./cidade-selector.component.css']
})
export class CidadeSelectorComponent implements OnInit {
  @Input() ufFormControl: FormControl;
  @Input() cidadeFormControl: FormControl;

  public estados: string[];
  cidadesFiltradas: Observable<string[]>;
  
  constructor() { }
 
  
  get cidades(): string[] {
    let a : string[] = [];
      if(!this.cidadeFormControl.disabled && this.ufFormControl.value != null){
      
         return this.filterCidadesByEstado(this.ufFormControl.value.nome);
      }
      return a ;
  }
  ngOnInit() {
    this.cidadeFormControl.disable();
   
    this.cidadesFiltradas = this.cidadeFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filterCidades(value)),
    );

   this.ufFormControl.valueChanges.subscribe(
     (value: EstadoBase) => {
       this.toggleEnableDisableField(value);
     }
   )
  }


  private toggleEnableDisableField(value: EstadoBase) {
    if(this.ufFormControl.disabled){
      this.cidadeFormControl.disable()
    }
    else if ( value == null ||  !this.estadoValido(value.nome)) {
      this.cidadeFormControl.disable();
      this.cidadeFormControl.setValue('');
    }
    else {
      this.cidadeFormControl.enable();
    }
  }

 getErrorMessage(){
  if(this.cidadeFormControl.touched && this.cidadeFormControl.dirty && this.ufFormControl.disabled  
      && this.cidadeFormControl.value && !this.cidadeValida(this.ufFormControl.value.nome, this.cidadeFormControl.value)){
        this.cidadeFormControl.setErrors({'incorrect': true});
        return "Escolha uma cidade valida!"
  }
  return null;
}

private estadoValido(estado: string):boolean{
  return ESTADOS.findIndex( est => est.nome == estado) != -1;
}
private cidadeValida(estado: string, cidade: string):boolean{
  return ESTADOS.find( est => est.nome == estado).cidades.findIndex(cid => cid == cidade)  != -1;
}

  private _filterCidades(value: string): string[] {
    
    if(value!=null){
      const filterValue = value.toLowerCase();
      return this.cidades.filter(cidade => cidade.toLowerCase().startsWith(filterValue));
    }
    return this.cidades;
   
  }
  private filterCidadesByEstado(estadoName: string) : string[]{
    let estado = ESTADOS[ESTADOS.findIndex( estado => estado.nome ==estadoName ) ];
    if(estado){
      return estado.cidades;
    }
    return [];
  }
 


}
 