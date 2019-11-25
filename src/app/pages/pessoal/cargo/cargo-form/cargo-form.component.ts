import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Cargo } from '../shared/model/cargo.model';
import { CargoService } from '../shared/service/cargo.service';
import { switchMap } from 'rxjs/operators';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.css']
})
export class CargoFormComponent extends BaseResourceFormComponent<Cargo> implements OnInit {

  imaskConfig={
    mask: Number,
    scale: 2,
    thousandsSeparator: '.',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ','
  };
 
  constructor( 
    protected cargoService: CargoService,
    protected injector: Injector,
  ) {super(injector, new Cargo(), cargoService, Cargo.fromJson)}
  
    
  protected loadResource() {
    if (this.currentAction == 'edit') {
        this.route.paramMap.pipe(
            switchMap(params => this.resourceService.getById(+params.get("id")))
        ).subscribe(
            (resource) => {
              this.resource = resource;
              console.log(resource)
              this.resourceForm.patchValue(resource); 
              console.log(this.resourceForm.value)
              console.log("this", this.resource)
            }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
        );
    } 
  }
  
  protected buildResourceForm(){
    this.resourceForm = this.formBuilder.group({
      id: [null],
      nomeCargo: [null, Validators.required],
      salarioBase: [null],
      descricao: [null, Validators.required],
    });
    
  }
  ngOnInit() {
    super.ngOnInit();
  }
  
  

  get formValue(){
    return this.resourceForm.value;
  }

  protected creationPageTitle():string{
    return "Cadastro de Novo Cargo"; 
  }

  protected editionPageTitle(): string{
    const name = this.resource.nomeCargo || ''
    return "Editando Cargo: " + name;
  }
}
