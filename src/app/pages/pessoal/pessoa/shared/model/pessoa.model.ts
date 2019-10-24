import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Email } from './email.model';
import { Cidade, Endereco } from './endereco.model';
import { RG } from './rg.model';
import { Telefone } from './telefone.model';

export abstract class Pessoa extends BaseResourceModel {	
 
    protected  tipo: TipoPessoa;
    constructor(
        public nome?: string,
        public email ?: Array<Email>,
        public telefone?: Array<Telefone>,
        public endereco?: Array<Endereco>,
         ){
        super();
    
    }

    getTipo(): TipoPessoa{
        return this.tipo;
    }

    static fromJson(jsonData: any): Pessoa{
        let pessoa;
        if(jsonData.tipo==TipoPessoa.PESSOAFISICA)
            pessoa = Object.assign(new PessoaFisica(), jsonData)
        
        else
            pessoa = Object.assign(new PessoaJuridica(), jsonData)
        return pessoa;
    }

}

export enum TipoPessoa{
    PESSOAFISICA = "PESSOA_FISICA",
    PESSOAJURIDICA = "PESSOA_JURIDICA"
}

export class PessoaFisica extends Pessoa{
    constructor(
	public cpf?: string, 
	public dataNascimento?: Date,
	public rg?: RG,
	public nacionalidade?: string,
	public naturalidade?: Cidade, 
    ){
        super();
        super.tipo = TipoPessoa.PESSOAFISICA;
    }


}

export class PessoaJuridica extends Pessoa{
    constructor (
        public cnpj?: string,
        public razaoSocial?: string, 
        public inscricaoEstadual?: string,
        public inscricaoMunicipal?: string
    ){
        super();
        super.tipo = TipoPessoa.PESSOAJURIDICA;
    }


}