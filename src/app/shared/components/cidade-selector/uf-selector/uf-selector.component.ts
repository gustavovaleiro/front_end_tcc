import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ESTADOS, EstadoBase } from 'src/app/shared/models/municipios.dados';
import { Estado } from 'src/app/pages/pessoal/pessoa/shared/model/endereco.model';

@Component({
  selector: 'app-uf-selector',
  templateUrl: './uf-selector.component.html',
  styleUrls: ['./uf-selector.component.css']
})

export class UfSelectorComponent implements OnInit {
  @Input() ufFormControl: FormControl;
  @Input() label: string = "UF";
  
  estadosFiltrados: Observable<Estado[]>;
  constructor() { }

  ngOnInit() {
    this.estadosFiltrados = this.ufFormControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterEstados(name) : this.estados)
    );
  }

   get estados() : Estado[]{
    return ESTADOS.map( estado =>{ return  { uf: estado.sigla, nome: estado.nome}})
  }
  displayFn(est?: Estado): string | undefined {
    return est ? est.uf + " - " +est.nome : undefined;
  }
  getErrorMessage(){
    if(this.ufFormControl.touched && this.ufFormControl.dirty 
        && this.ufFormControl.value && !this.estadoValido(this.ufFormControl.value.nome)){
          this.ufFormControl.setErrors({'incorrect': true});
          return "Escolha um estado valido!"
    }
    return null;
  }
  private estadoValido(estado: string):boolean{
    return ESTADOS.findIndex( est => est.nome == estado) != -1;
 }
  private _filterEstados(value: string): Estado[] {
    const filterValue = value.toLowerCase();
  
    return this.estados.filter(estado => estado.nome.toLowerCase().startsWith(filterValue));
  }

}
