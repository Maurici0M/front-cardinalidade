import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() onPageView: any = new EventEmitter<any>();

  redirectToCadastro(){
    this.onPageView.emit({
      currentPage: 'COMPRADOR_COMPONENT',
      subPage: 'CADASTRO'
    });
  }

  redirectToLogin(){
    this.onPageView.emit({
      currentPage: 'COMPRADOR_COMPONENT',
      subPage: 'LOGIN'
    });
  }

  redirectToListagem(){
    this.onPageView.emit({
      currentPage: 'COMPRADOR_COMPONENT',
      subPage: 'LISTAGEM'
    });
  }

  redirectToHome(){
    this.onPageView.emit({
      currentPage: 'HOME'
    })
  }

}
