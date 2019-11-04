import { Component, OnInit, Input } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { of } from 'rxjs';
import { finalize, catchError, switchMap, tap, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { CategoriaItem } from 'src/app/pages/estoque/categoria-item/shared/model/categoria-item.model';
import { CategoriaService } from 'src/app/pages/estoque/categoria-item/shared/service/categoria-item.service';

@Component({
  selector: 'app-categoria-selector',
  templateUrl: './categoria-selector.component.html',
  styleUrls: ['./categoria-selector.component.css']
})
export class CategoriaSelectorComponent implements OnInit {
  filteredCategoria: CategoriaItem[] = [];
  @Input() formControlId: FormControl;
  @Input() formControlNome: FormControl; 
  isLoading = false;
   
  constructor( private categoriaService: CategoriaService) {}
  ngOnInit() {
    this.formControlNome
    .valueChanges
    .pipe(
      debounceTime(1000),
      tap(() => this.isLoading = true),
      switchMap(value => {
        if( this.filteredCategoria.findIndex(car => car.nome == value) == -1){
          this.formControlId.setValue('');
          return this.categoriaService.getAllByName(value)
          .pipe(catchError(err => of([])),
            finalize(() => this.isLoading = false),
            )
        } else{
          let id =  this.getIdOf(value)
          if(id>-1)
          this.formControlId.setValue(id);
          this.isLoading = false;
          return of(this.filteredCategoria);
        }
      })
    )
    .subscribe(categorias => this.filteredCategoria = categorias, error=> {
      this.isLoading = false
      this.filteredCategoria= [];
    }  );

  }
  getErrorMessage(){
    if(this.formControlNome.touched && this.formControlNome.dirty 
      && this.formControlNome.value && !this.existeCategoria(this.formControlNome.value)){
        this.formControlNome.setErrors({'incorrect': true});
        return "Escolha um categoria valido!"
  }
  return null;
  }
  select(event: MatAutocompleteSelectedEvent){
    let id = this.getIdOf(event.option.value);
 
    if(id>-1)
       this.formControlId.setValue(id);
  }

  private getIdOf(nome:string){
    if(this.existeCategoria(nome))
      return this.filteredCategoria[this.filteredCategoria.findIndex(car => car.nome == nome)].id;
    else
      return -1;
  }

  private existeCategoria(nome): boolean{
    return this.filteredCategoria.findIndex(car => car.nome===nome) >-1;
  }

}
 