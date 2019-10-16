import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sub-header-form',
  templateUrl: './sub-header-form.component.html',
  styleUrls: ['./sub-header-form.component.css']
})
export class SubHeaderFormComponent implements OnInit {
   @Input() public titulo: string = '';
   @Input() public botaoTexto: string = '';
   @Output() public funcao :EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  click(){
    this.funcao.emit();
  }

}
 