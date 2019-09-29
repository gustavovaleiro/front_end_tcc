import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class CredenciasDTO extends BaseResourceModel{
    login: string;
    password: string;
}