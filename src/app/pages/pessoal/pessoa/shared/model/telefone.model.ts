import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Telefone extends BaseResourceModel {
    numero: string;
    tipo: string;
    principal: boolean;
    ddd: string;
}