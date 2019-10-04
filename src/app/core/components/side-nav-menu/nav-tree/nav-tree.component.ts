import { Component, OnInit } from '@angular/core';
import {FlatTreeControl, CdkTreeNodeDef} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { allPageInfos, TipoFuncao, Modulo, PageInfos } from 'src/app/pages/login/shared/models/pageinfos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


/**
 * Food data with nested structure.
 * Each node has a name and an optiona list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

/** Flat node with expandable and level information  */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}


@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.css']
})
export class NavTreeComponent   {
 
  public concluido: boolean = false;

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);
    treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor() {
    
    this.dataSource.data = [];
    let vetor_buffer: FoodNode[] = [];
    allPageInfos.forEach( pageInfo => {
      console.log("começando")
      if(pageInfo.tipo == TipoFuncao.PRINCIPAL){ // se a função nao é auxiliar
       
       if(this.existeNode(pageInfo.modulo.toString(), vetor_buffer)){ // se ja existe o modulo 
          console.log("Ja existe no");
          this.adicionaNoPrincipal(pageInfo.modulo.toString(), pageInfo.nome,vetor_buffer);  // adiciona o nó da função ao nó do modulo
       }else{ // SE NAO EXISTE O MODULO, 
          this.criaModulo(vetor_buffer,pageInfo.modulo.toString());
          this.adicionaNoPrincipal(pageInfo.modulo.toString(), pageInfo.nome,vetor_buffer);
       }
      }else{ // se é uma função auxiliar
          if(this.existeNode(TipoFuncao.AUXILIAR.toString(), vetor_buffer[this.getModuloIndex(pageInfo.modulo.toString(),vetor_buffer)].children)){
              this.adicionaNoAuxiliar(pageInfo,vetor_buffer);
          }else{
            const moduleIndex = this.getModuloIndex(pageInfo.modulo.toString(),vetor_buffer);
            this.criaModulo(vetor_buffer[moduleIndex].children,TipoFuncao.AUXILIAR.toString());
            this.adicionaNoAuxiliar(pageInfo,vetor_buffer);
          }
      } 
     
    })
    this.dataSource.data = vetor_buffer;
    this.concluido=true;
   // jA TA CRIANDO A ESTRUTURA MAIS OU MENOS O QUE EU QUERO, SÓ N IDENTIFIQUEI PQ Q AINDA N TA RENDERIZANDO
     
    console.log(this.concluido)
    console.log(this.dataSource.data);
    console.log();
  }
 
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;


  private adicionaNoAuxiliar(pageInfo: PageInfos, v:FoodNode[]) {
    let moduloIndex = this.getModuloIndex(pageInfo.modulo,v);
    let auxiliarIndex = this.getAuxiliarNodeIndex(moduloIndex,v);
    this.adicionaNome(v[moduloIndex].children[auxiliarIndex].children, pageInfo.nome);
  }

  private getAuxiliarNodeIndex(moduloIndex: number, v:FoodNode[]) {
    return v[moduloIndex].children.findIndex(node => (node.name == TipoFuncao.AUXILIAR.toString()));
  }

  private adicionaNoPrincipal(moduloName: string, noName: string, v:FoodNode[]) {
    let modulo_index = this.getModuloIndex(moduloName,v); // pego o index desse modulo
    this.adicionaNome(v[modulo_index].children,noName);
  }

  private criaModulo(vetor: FoodNode[], nome: string) {
     
   vetor.push({ name: nome, children: [] });
  }

  private getModuloIndex(moduloName: string, v:FoodNode[]) {
    return v.findIndex(node => (node.name == moduloName));
  }
  private existeNode(name: string, vetor: FoodNode[]){
      return vetor.findIndex(node => node.name == name) >= 0;
  }
  private adicionaNome(filho: any, nome: string) {
    filho.push({ name: nome});
  }
}

