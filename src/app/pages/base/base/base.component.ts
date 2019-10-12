import { Component, OnInit } from '@angular/core';
import { PessoaFisica, Pessoa } from '../../pessoal/pessoa/shared/model/pessoa.model';
import { CategoryService } from '../../pessoal/pessoa/shared/category.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor(catS: CategoryService) { 
    catS.create(PessoaFisica.fromJson({
      "nome": "Algum nome",
 
     "email": [
        {
       
            "email": "Joao.Da.Silva1320424@example.com",
            "tipo": "geradoAutomatico",
            "principal": true
        }
    ],
    "telefone": [
        {
         
            "numero": "944516271",
            "tipo": "GeradoAutomaticamente",
            "principal": true,
            "ddd": "59"
        }
    ],
    "endereco": [
    	{
            "rua": "Test rua tal",
            "bairro": "Centro",
            "cidade": {
                "id": 1,
                "nome": "Goiania",
                "estado": {
                    "id": 1,
                    "nome": "Goias",
                    "uf": "GO"
                }
            },
                    "numero": "123",
            "complemento": "prox ao carai",
            "principal": true,
            "tipo": "Endereco residencial",
          
            "cep": "75840000"
        }
        ],
    "tipo": "PESSOA_FISICA",
    "cpf": "06681397069",
    "dataNascimento": "1990-04-30",
    "nacionalidade": "Brasileira",
    "naturalidade": {
        "id": 1,
        "nome": "Goiania",
        "estado": {
            "id": 1,
            "nome": "Goias",
            "uf": "GO"
        }
       
    },
    "rg": {
        "emissor": "SSP GO",
        "uf": {
            "id": 1,
            "nome": "Goias",
            "uf": "GO"
        },
        "rg": "23023"
    }
    })).subscribe( pessoa => console.log(pessoa), error => console.log(error));
    let p: PessoaFisica = new PessoaFisica();
    console.log(p);
  }

  ngOnInit() {
  }

}
