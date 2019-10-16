import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'excluir-complementar-row',
  templateUrl: './complementar-form-excluir.component.html',
  styleUrls: ['./complementar-form-excluir.component.css']
})
export class ComplementarFormExcluirComponent implements OnInit {
  @Input() index: number;
  @Input() disabled: boolean = true;
  @Output() callFunction:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  } 

  call(){
    this.callFunction.emit(this.index);
  }

}
