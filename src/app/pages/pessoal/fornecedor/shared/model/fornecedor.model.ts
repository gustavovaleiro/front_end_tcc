import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Pessoa } from '../../../pessoa/shared/model/pessoa.model';
import { Runner } from 'protractor';
import { Cargo } from '../../../cargo/shared/model/cargo.model';
import { CategoriaItem } from 'src/app/pages/estoque/categoria-item/shared/model/categoria-item.model';

export class Fornecedor extends BaseResourceModel{

    constructor(

       public pessoa?: Pessoa,
       public categorias? : Array<CategoriaItem>,
    ){
       super();

    }

    static fromJson(jsonData: any): Fornecedor{
        return  Object.assign(new Fornecedor(), jsonData)
    }
}

export class FornecedorListDTO extends BaseResourceModel{
   
    constructor(  
        public nome?: string,
        public  tipo?: string,
        public cpfCnpj?: string,
        public telefone?: string,
        public email?: string,
        public cidade?: string){
        super();
    }

  public get telefoneWithoutTipo(){
      let telefone = this.telefone.split(":")[1]

     return telefone ;
  }
  static fromJson(jsonData: any): Fornecedor{
        return  Object.assign(new FornecedorListDTO(), jsonData)
    }
}