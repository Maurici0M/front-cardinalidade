import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CompradorAtualizarCadastro,
  CompradorCadastro,
  CompradorExcluirCadastroByCPF,
  CompradorListagem,
  CompradorListagemPaginacao,
  CompradorListarByCPF,
} from '../model/comprador';

@Injectable({
  providedIn: 'root',
})
export class CompradorService {
  //private apiUrl = 'https://cardinalidade-production.up.railway.app/comprador/';

  private apiUrl = 'http://localhost:8080/comprador/';

  constructor(private http: HttpClient) {}

  cadastrar(dados: CompradorCadastro): Observable<any> {
    return this.http.post<CompradorCadastro>(this.apiUrl, dados);
  }

  listar(): Observable<CompradorListagem[]> {
    return this.http.get<CompradorListagem[]>(this.apiUrl);
  }

  listarByCPF(cpf: CompradorListarByCPF): Observable<any> {
    return this.http.post<CompradorListarByCPF>(
      `${this.apiUrl}listar/cpf`,
      cpf
    );
  }

  atualizarCadastro(dados: CompradorAtualizarCadastro): Observable<any> {
    return this.http.put<CompradorAtualizarCadastro>(`${this.apiUrl}`, dados);
  }

  excluirCadastroByCpf(cpf: CompradorExcluirCadastroByCPF): Observable<any> {
    const params = new HttpParams().set('cpf', cpf.cpf);

    return this.http.delete<CompradorExcluirCadastroByCPF>(`${this.apiUrl}`, {
      params,
    });
  }
}
