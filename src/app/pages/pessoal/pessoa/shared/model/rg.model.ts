import { Estado } from './endereco.model';

export interface RG {
    emissor: string;
    uf: Estado;
    rg: string;
}