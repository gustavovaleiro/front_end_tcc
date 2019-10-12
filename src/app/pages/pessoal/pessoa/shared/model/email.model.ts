import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Email extends  BaseResourceModel{
    email: string;
    tipo: string;
    principal: boolean;
}
