import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-comprador',
  templateUrl: './comprador.component.html',
  styleUrl: './comprador.component.scss'
})
export class CompradorComponent {
  @Output() onPageView: any = new EventEmitter<any>();
  @Input() subPage: 'CADASTRO' | 'LISTAGEM' | 'EDITAR' = 'CADASTRO';
  @Input() userAccess!: string;

}
