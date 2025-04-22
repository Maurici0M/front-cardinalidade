import { Component } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Leon', weight: "S. Kennedy", symbol: 'SP'}
];

@Component({
  selector: 'app-listagem-compradores',
  templateUrl: './listagem-compradores.component.html',
  styleUrl: './listagem-compradores.component.scss'
})
export class ListagemCompradoresComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'teste'];
  dataSource = ELEMENT_DATA;
}
