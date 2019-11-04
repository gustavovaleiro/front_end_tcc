import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';
import { RouterModule } from '@angular/router';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FormFieldErrorComponent } from './components/form-field-error/form-field-error.component';
import { ServerErrorMessageComponent } from './components/server-error-message/server-error-message.component';
import { DashComponent } from '../pages/dashboard/dash/dash.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import localePt from '@angular/common/locales/pt';
import {MatInputModule, MatDatepickerModule, MatCheckboxModule, MatProgressSpinnerModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { CalendarModule } from 'primeng/calendar';
import { CidadeSelectorComponent } from './components/cidade-selector/cidade-selector.component';
import { UfSelectorComponent } from './components/cidade-selector/uf-selector/uf-selector.component';
import { SubHeaderFormComponent } from './components/sub-header-form/sub-header-form.component';
import { ComplementarFormExcluirComponent } from './components/complementar-form-excluir/complementar-form-excluir.component';
import { TelefoneFormComponent } from './components/telefone-form/telefone-form.component';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { EnderecoFormComponent } from './components/endereco-form/endereco-form.component';
import { CargoSelectorComponent } from './components/cargo-selector/cargo-selector.component';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { KzCpfCnpjPipe } from './pipe/cnpj-cpf-format.pipe';
import { CategoriaSelectorComponent } from './components/categoria-selector/categoria-selector.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

registerLocaleData(localePt);

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
    EmailFormComponent,
    EnderecoFormComponent,
    CargoSelectorComponent,
    KzCpfCnpjPipe,
    CategoriaSelectorComponent
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
    MatProgressSpinnerModule,
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
    MatProgressSpinnerModule,
    
    BreadCrumbComponent,
    PageHeaderComponent,
    FormFieldErrorComponent,
    ServerErrorMessageComponent,
    CidadeSelectorComponent,
    UfSelectorComponent,
    SubHeaderFormComponent,
    ComplementarFormExcluirComponent,
    TelefoneFormComponent,
    EmailFormComponent,
    EnderecoFormComponent,
    CargoSelectorComponent,
    KzCpfCnpjPipe,
    CategoriaSelectorComponent
  ],
  providers: [
   
    { provide: LOCALE_ID, useValue: "pt" },
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},

    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  
],
})
export class SharedModule { }
