import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  @Input() contsImagenes: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
