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
    recurso: string;
    tipo: TipoFuncao;
    modulo: Modulo;

}

export const allPageInfos : Array<PageInfos> = [
    {nome: "Funcionários", recurso: "funcionarios", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Clientes", recurso: "clientes",tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Fornecedores", recurso: "fornecedores",tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.PESSOAL},
    {nome: "Cargos", recurso: "cargos",tipo: TipoFuncao.AUXILIAR, modulo: Modulo.PESSOAL},

    {nome: "Produtos e Serviços", recurso: "itens", tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.ESTOQUE},
    {nome: "Movimentações",  recurso: "movimentacoes",  tipo: TipoFuncao.PRINCIPAL, modulo: Modulo.ESTOQUE},
    {nome: "Unidades",  recurso: "unidades",  tipo: TipoFuncao.AUXILIAR, modulo: Modulo.ESTOQUE},
    {nome: "Categorias",  recurso: "categorias",  tipo: TipoFuncao.AUXILIAR, modulo: Modulo.ESTOQUE},
]


