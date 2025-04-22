import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @Input() currentPage: 'COMPRADOR_COMPONENT' | 'PEDIDO_COMPONENT' | 'TESTE' = 'TESTE'; //inicia no comprador component
  @Input() subPage: 'CADASTRO' | 'LISTAGEM' | '' = '';
  @Input() statusPage!: string;
  @Input() msgError!: string;
  @Input() userAccess!: string;

  onPageViewChange(update: {
    currentPage: any;
    subPage: any;
    statusPage?: string;
    msgError?: string;
    userAccess?: string;
  }){

    this.currentPage = update.currentPage;
    this.subPage = update.subPage;
    this.statusPage = update.statusPage ?? '';
    this.msgError = update.msgError ?? '';
    this.userAccess = update.userAccess ?? '';

  }

  testeMudaPagina(currentPage: any, subPage?: any){
    this.currentPage = currentPage;
    this.subPage = subPage;
  }

}
