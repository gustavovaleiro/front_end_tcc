import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';

import { switchMap } from 'rxjs/operators';
import { Validators } from '@angular/forms';
import { CategoriaItem } from '../shared/model/categoria-item.model';
import { CategoriaService } from '../shared/service/categoria-item.service';

@Component({
  selector: 'app-categoriaitem-form',
  templateUrl: './categoria-item-form.component.html',
  styleUrls: ['./categoria-item-form.component.css']
})
export class CategoriaItemFormComponent extends BaseResourceFormComponent<CategoriaItem> implements OnInit {



  constructor( 
    protected categoriaItemService: CategoriaService,
    protected injector: Injector,
  ) {super(injector, new CategoriaItem(), categoriaItemService, CategoriaItem.fromJson)}
  
    
  protected loadResource() {
    if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+params.get("id")))
        ).subscribe(
            (resource) => {
              this.resource = resource;
              this.resourceForm.patchValue(resource); 
            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    } 
  }
  
  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nome: [null, Validators.required],
    });
    
  }
  ngOnInit() {
    super.ngOnInit();
  }
  

  get formValue(){
    return this.resourceForm.value;
  }

  protected creationPageTitle():string{
    return "Cadastro de Nova Categoria"; 
  }

  protected editionPageTitle(): string{
    const name = this.resource.nome  || ''
    return "Editando Categoria: " + name;
  }
}
