import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component';
import { DashComponent } from '../pages/dashboard/dash/dash.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule, MatDatepickerModule, MatCheckboxModule} from '@angular/material';
import { CalendarModule } from 'primeng/calendar';
import { CidadeSelectorComponent } from './components/cidade-selector/cidade-selector.component';
import { UfSelectorComponent } from './components/cidade-selector/uf-selector/uf-selector.component';
import { SubHeaderFormComponent } from './components/sub-header-form/sub-header-form.component';
import { ComplementarFormExcluirComponent } from './components/complementar-form-excluir/complementar-form-excluir.component';
import { TelefoneFormComponent } from './components/telefone-form/telefone-form.component';




@NgModule({
  declarations: [
    BreadCrumbComponent, 
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent,
    CidadeSelectorComponent,
    UfSelectorComponent,
    SubHeaderFormComponent,
    ComplementarFormExcluirComponent,
    TelefoneFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CalendarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CalendarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent,
    CidadeSelectorComponent,
    UfSelectorComponent,
    SubHeaderFormComponent,
    ComplementarFormExcluirComponent,
    TelefoneFormComponent,
  ]
})
export class SharedModule { }
