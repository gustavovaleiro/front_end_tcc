import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export  class CategoriaItem extends BaseResourceModel{
    constructor( 
        public nome?:string
    ){
        super()
    }
    static fromJson(jsonData: any): CategoriaItem{
        return  Object.assign(new CategoriaItem(), jsonData)
    }
}
