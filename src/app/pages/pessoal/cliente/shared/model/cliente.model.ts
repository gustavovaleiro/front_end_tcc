import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Pessoa } from '../../../pessoa/shared/model/pessoa.model';
import { Runner } from 'protractor';

export class Cliente extends BaseResourceModel{

    constructor(

       public pessoa?: Pessoa,
        public limiteCompra?:number,
        public descricao?: string,
    ){
       super();

    }

    static fromJson(jsonData: any): Cliente{
        return  Object.assign(new Cliente(), jsonData)
    }
} 

export class ClienteListDTO extends BaseResourceModel{
   
    constructor(  public nome?: string,
        public  tipo?: string,
        public limteCompra?: number,
        public telefone?: string,
        public email?: string,
        public cidade?: string){
        super();
    }

  public get telefoneWithoutTipo(){
      let telefone = this.telefone.split(":")[1]

     return telefone ;
  }
  static fromJson(jsonData: any): Cliente{
        return  Object.assign(new ClienteListDTO(), jsonData)
    }
}