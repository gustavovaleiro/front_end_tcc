export enum TipoFuncao{
    AUXILIAR = "Auxiliares",
    PRINCIPAL = "Principal"
}
export enum Modulo{
    PESSOAL = "Pessoal",
    ESTOQUE = "Estoque"
}

export class PageInfos{
    nome: string;
    tipo: TipoFuncao;
    modulo: Modulo;

}

export const allPageInfos : Array<PageInfos> = [
    {nome: "Funcionários", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Clientes", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Fornecedores", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Cargos", tipo: TipoFuncao.AUXILIAR, modulo: Modulo.PESSOAL},

    {nome: "Produtos e Serviços", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.ESTOQUE},
    {nome: "Movimentações", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.ESTOQUE},
    {nome: "Unidades", tipo: TipoFuncao.AUXILIAR, modulo: Modulo.ESTOQUE},
    {nome: "Categorias", tipo: TipoFuncao.AUXILIAR, modulo: Modulo.ESTOQUE},
]


