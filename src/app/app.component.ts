import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @Input() currentPage: 'COMPRADOR_COMPONENT' | 'PEDIDO_COMPONENT' | 'HOME' = 'HOME'; //inicia no HOME-PAGE component
  @Input() subPage: 'CADASTRO' | 'LISTAGEM' | 'EDITAR' = 'CADASTRO'; //inicia no cadastro
  @Input() statusPage: 'SUCCESS' | 'ERROR' | 'WARNING' = 'ERROR'; //inicia no erro
  @Input() msgError!: string;
  @Input() userAccess!: string;

  onPageViewChange(update: {
    currentPage: any;
    subPage: any;
    statusPage?: any;
    msgError?: string;
    userAccess?: string;
  }){

    this.currentPage = update.currentPage;
    this.subPage = update.subPage;
    this.statusPage = update.statusPage;
    this.msgError = update.msgError ?? '';
    this.userAccess = update.userAccess ?? '';

  }

  testeMudaPagina(currentPage: any, subPage?: any){
    this.currentPage = currentPage;
    this.subPage = subPage;
    this.userAccess = '12345678909';
  }

}
