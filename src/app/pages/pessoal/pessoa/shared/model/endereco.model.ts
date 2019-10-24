import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Endereco extends BaseResourceModel{
    id: number;
    rua: string;
    bairro: string;
    cidade: Cidade;
    numero: string;
    complemento: string;
    principal: boolean;
    tipo: string;
    cep: string;
}    
export class Cidade extends BaseResourceModel {
        id: number;
        nome: string;
        estado: Estado;
}

export class Estado extends BaseResourceModel {
    id?: number;
    nome?: string;
    uf?: string; 
}