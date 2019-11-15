import { Component, OnInit, Input } from '@angular/core';
import { Cargo } from 'src/app/pages/pessoal/cargo/shared/model/cargo.model';
import { CargoService } from 'src/app/pages/pessoal/cargo/shared/service/cargo.service';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { filter } from 'minimatch';
import { of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { GetErrorMessage } from '../form-field-error/error-message';

@Component({
  selector: 'app-cargo-selector',
  templateUrl: './cargo-selector.component.html',
  styleUrls: ['./cargo-selector.component.css']
})
export class CargoSelectorComponent implements OnInit {

  filteredCargo: Cargo[] = []; 
  @Input() formControlId: FormControl;
  @Input() formControlNome: FormControl; 
  isLoading = false;
   
  constructor( private cargoService: CargoService, private errorMessage: GetErrorMessage) {}
  ngOnInit() {
    this.formControlNome
    .valueChanges
    .pipe(
      debounceTime(1000),
      tap(() => this.isLoading = true),
      switchMap(value => {
        if( this.filteredCargo.findIndex(car => car.nomeCargo == value) == -1){
          this.formControlId.setValue('');
          return this.cargoService.getAllByName(value)
          .pipe(catchError(err => of([])),
            finalize(() => this.isLoading = false),
            )
        } else{
          let id =  this.getIdOf(value)
          if(id>-1)
          this.formControlId.setValue(id);
          this.isLoading = false;
          return of(this.filteredCargo);
        }
      })
    )
    .subscribe(cargos => this.filteredCargo = cargos, error=> {
      this.isLoading = false
      this.filteredCargo= [];
    }  );

  }
  getErrorMessage(){

    if(this.formControlNome.touched && this.formControlNome.dirty 
       && (!this.existeCargo(this.formControlNome.value)  || this.formControlNome.invalid)){
        this.formControlNome.setErrors({'incorrect': true});
        return "Escolha um cargo valido!"
  } else if (this.formControlNome.errors){
    return this.errorMessage.getErrorMessage(this.formControlNome);
  }
  return null;
  }
  select(event: MatAutocompleteSelectedEvent){
    let id = this.getIdOf(event.option.value);
 
    if(id>-1)
       this.formControlId.setValue(id);
  }

  private getIdOf(nome:string){
    if(this.existeCargo(nome))
      return this.filteredCargo[this.filteredCargo.findIndex(car => car.nomeCargo == nome)].id;
    else
      return -1;
  }

  private existeCargo(nome): boolean{
    return this.filteredCargo.findIndex(car => car.nomeCargo===nome) >-1;
  }
}
