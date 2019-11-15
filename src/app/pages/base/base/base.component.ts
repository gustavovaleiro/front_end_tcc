import { Component, OnInit } from '@angular/core';
import { PessoaFisica, Pessoa } from '../../pessoal/pessoa/shared/model/pessoa.model';
import { PessoaService } from '../../pessoal/pessoa/shared/pessoa.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
  }

}
