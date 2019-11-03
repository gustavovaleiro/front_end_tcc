import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
export class Cargo extends BaseResourceModel{

    constructor(

        public nomeCargo?: string,
        public descricao?:string,
        public salarioBase?: string,
    ){
       super();
    }

    static fromJson(jsonData: any): Cargo{
        return  Object.assign(new Cargo(), jsonData)
    }
}
