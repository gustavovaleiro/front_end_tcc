import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CalendarModule, Calendar} from 'primeng/calendar';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { CategoryFormComponent } from './pessoa-form/category-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';


@NgModule({
  declarations: [CategoryFormComponent],
  imports: [
    SharedModule,
    PessoaRoutingModule,
    CalendarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    
    
  ],
  exports: [
     
  ]
})
export class PessoaModule { }
