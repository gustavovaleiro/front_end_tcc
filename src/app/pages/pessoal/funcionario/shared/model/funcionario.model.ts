import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Pessoa } from '../../../pessoa/shared/model/pessoa.model';
import { Runner } from 'protractor';
import { Cargo } from '../../../cargo/shared/model/cargo.model';

export class Funcionario extends BaseResourceModel{

    constructor(

       public pessoa?: Pessoa,
       public matricula? : string,
       public cargo?: Cargo,
       public dataDeAdmissao?: Date,

        public comissao? : number,
        public adicionalPessoal? : number,
    ){
       super();

    }

    static fromJson(jsonData: any): Funcionario{
        return  Object.assign(new Funcionario(), jsonData)
    }
}

export class FuncionarioListDTO extends BaseResourceModel{
   
    constructor(  
        public nome?: string,
        public  tipo?: string,
        public matricula?: number,
        public telefone?: string,
        public email?: string,
        public cargo?: string){
        super();
    }

  public get telefoneWithoutTipo(){
      let telefone = this.telefone.split(":")[1]

     return telefone ;
  }
  static fromJson(jsonData: any): Funcionario{
        return  Object.assign(new FuncionarioListDTO(), jsonData)
    }
}