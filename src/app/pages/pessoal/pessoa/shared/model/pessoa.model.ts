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

}

export enum TipoPessoa{
    PESSOAFISICA = "PESSOA_FISICA",
    PESSOAJURIDICA = "PESSOA_JURIDICA"
}

export class PessoaFisica extends Pessoa{
    constructor(
	public cpf?: string, 
	public dataNascimento?: Date,
	public rG?: RG,
	public nacionalidade?: string,
	public naturalidade?: Cidade, 
    ){
        super();
        super.tipo = TipoPessoa.PESSOAFISICA;
    }

    static fromJson(jsonData: any): Pessoa{
        return Object.assign(new PessoaFisica(), jsonData);
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

    static fromJson(jsonData: any): Pessoa{
        return Object.assign(new PessoaJuridica(), jsonData);
    }
}