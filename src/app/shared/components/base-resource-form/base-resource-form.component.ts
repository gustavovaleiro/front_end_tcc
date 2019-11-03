import {  OnInit, AfterContentChecked, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms"

import { switchMap } from 'rxjs/operators'
import toastr from "toastr"
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resource.service';
import { GetErrorMessage } from '../form-field-error/error-message';
import { HttpErrorResponse } from '@angular/common/http';


export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

    currentAction: string;
     resourceForm: FormGroup;
    pageTitle: string;
    serverErrorMessages: string[] = null;
    submittingForm: boolean = false;
    public errorMessage: GetErrorMessage = new GetErrorMessage();
    protected route: ActivatedRoute;
    protected router: Router;
    protected formBuilder: FormBuilder;
    constructor(
        protected injector: Injector,
        public resource: T,
        protected resourceService: BaseResourceService<T>,
        protected jsonDataToResourceFn: (jsonData: any)=> T
    ) {
        this.formBuilder = this.injector.get(FormBuilder);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
    }

    ngOnInit() {
        this.setCurrentAction();
        this.buildResourceForm();
        this.loadResource();
    }

    ngAfterContentChecked() {
        this.setPageTitle()
    }

    protected setPageTitle() {
        if (this.currentAction == 'new') {
            this.pageTitle = this.creationPageTitle();
        } else {
            this.pageTitle = this.editionPageTitle();
        }
    }

    protected creationPageTitle(): string{
        return "Novo";
    }
    protected editionPageTitle(): string{
        return "Edição";
    }

    submitForm() {
        this.submittingForm = true;
        if (this.currentAction == 'new') {
            this.createResource();
        } else {
            this.updateResource();
        }
    }

    protected createResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
      
        this.resourceService.create(resource).subscribe(
            (resource) => 
                this.actionsForSuccess(resource),
            
            (error) => this.actionsForError(error)
        );
    }
    protected updateResource() {
        const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
       
        this.resourceService.update(resource).subscribe(
            resource => this.actionsForSuccess(resource),
            error => this.actionsForError(error)
        );
    }

    protected actionsForSuccess(resource: T) {
        toastr.success("Solicitação processada com sucesso!");
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        const baseResourcePath: string = this.route.snapshot.parent.url[0].path;
        this.router.navigateByUrl(baseResourcePath, {skipLocationChange: true}).then(
            ()=> this.router.navigate([baseResourcePath, resource.id, "edit"])
        );
    }

    protected actionsForError(error) {
        toastr.error("Ocorreu um erro ao processar a sua solicitação");
        console.log(error);
        this.submittingForm = false;
        let scrollToTop = window.setInterval(() => {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 20); // how far to scroll on each step
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16);
        if (error.status === 422){
            this.serverErrorMessages = []
            this.serverErrorMessages.push ((error as HttpErrorResponse).error.errors.map(err =>  err.message))

        }
           
        else
            this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."];
    }

    protected setCurrentAction() {
        if (this.route.snapshot.url[0].path == 'new')
            this.currentAction = 'new';
        else
            this.currentAction = 'edit';
    }

    protected loadResource() {
        if (this.currentAction == 'edit') {
            this.route.paramMap.pipe(
                switchMap(params => this.resourceService.getById(+params.get("id")))
            ).subscribe(
                (resource) => {
                    this.resource = resource;
                    this.resourceForm.patchValue(resource)
                }, (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
            );
        }
    }

    protected abstract buildResourceForm(): void;

    // ERROS
    public  getErrorMessage(formControl: FormControl): string {
       
       return  this.errorMessage.getErrorMessage(formControl);
      }
    
    
    
}
