import { Component, Input, OnInit } from '@angular/core';
import { Consola } from 'src/backend/front/Consola';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  @Input() lista!: any[];
  constructor() { }

  ngOnInit(): void {
    
  }

}
