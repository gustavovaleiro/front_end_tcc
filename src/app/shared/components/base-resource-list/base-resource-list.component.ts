import { BaseResourceService } from '../../services/base-resource.service';
import { BaseResourceModel } from '../../models/base-resource.model';
import { OnInit } from '@angular/core';

export abstract class BaseResourceListComponent<T extends BaseResourceModel,Y extends BaseResourceModel> implements OnInit{
    resources: Y[] = [];

    constructor(protected resourceService: BaseResourceService<T>) { 
        
    }
  
    ngOnInit() {
      this.resourceService.getAllPage().subscribe(
        resources => {
          this.resources =  resources.sort((a,b) => b.id - a.id) 
          console.log(this.resources)}, 
        error => alert('erro ao carregar a lista'));
    }
  
    deleteResource(resource: Y){
      const mustDelete = confirm("Deseja realmente excluir este item?");
      
      if(mustDelete)
        this.resourceService.delete(resource.id).subscribe(
          () => this.resources = this.resources.filter( el => el != resource),
          error => alert ("Erro ao tentar excluir")
        );
        
    }
   

}