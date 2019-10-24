import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Pessoa } from '../../../pessoa/shared/model/pessoa.model';

export class Cliente extends BaseResourceModel{

    constructor(
        public id?: number,
       public pessoa?: Pessoa,
        public limiteCredito?:number,
        public descricao?: string,
    ){
       super();

    }

    static fromJson(jsonData: any): Cliente{
        return  Object.assign(new Cliente(), jsonData)
    }
}