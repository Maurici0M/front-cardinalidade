import { Component, OnInit } from '@angular/core';
import { CompradorListagem } from '../../../model/comprador';
import { CompradorService } from '../../../service/comprador.service';

@Component({
  selector: 'app-listagem-compradores',
  templateUrl: './listagem-compradores.component.html',
  styleUrl: './listagem-compradores.component.scss',
})
export class ListagemCompradoresComponent implements OnInit {

  displayedColumns: string[] = [
    'classificacao',
    'nome',
    'sobrenome',
    'estado',
    'pedidos',
  ];

  listaCompradores: CompradorListagem[] = [];

  constructor(private service: CompradorService) {}

  ngOnInit(): void {
    this.inicializaListagem();
  }

  inicializaListagem(){
    //como existe paginacao na listagem, declare a lista como any e depois acesse o content
    //dentro do content da paginacao fica a lista com os dados
    this.service.listar().subscribe((listaCompradores: any) => {
      this.listaCompradores = listaCompradores.content;
    });
  }

}
