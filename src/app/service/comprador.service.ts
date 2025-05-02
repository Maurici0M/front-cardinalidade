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
  private apiUrlServer = 'https://cardinalidade-production.up.railway.app/comprador/';

  private apiUrlLocal = 'http://localhost:8080/comprador/';

  constructor(private http: HttpClient) {}

  cadastrar(dados: CompradorCadastro): Observable<any> {
    return this.http.post<CompradorCadastro>(this.apiUrlLocal, dados);

    return this.http.post<CompradorCadastro>(this.apiUrlServer, dados);

  }

  listar(): Observable<CompradorListagem[]> {
    return this.http.get<CompradorListagem[]>(this.apiUrlLocal);

    return this.http.get<CompradorListagem[]>(this.apiUrlServer);
  }

  listarByCPF(cpf: CompradorListarByCPF): Observable<any> {
    return this.http.post<CompradorListarByCPF>(
      `${this.apiUrlLocal}listar/cpf`,
      cpf
    );

    return this.http.post<CompradorListarByCPF>(
      `${this.apiUrlServer}listar/cpf`,
      cpf
    );
  }

  atualizarCadastro(dados: CompradorAtualizarCadastro): Observable<any> {
    return this.http.put<CompradorAtualizarCadastro>(`${this.apiUrlLocal}`, dados);

    return this.http.put<CompradorAtualizarCadastro>(`${this.apiUrlServer}`, dados);
  }

  excluirCadastroByCpf(cpf: CompradorExcluirCadastroByCPF): Observable<any> {
    const params = new HttpParams().set('cpf', cpf.cpf);

    return this.http.delete<CompradorExcluirCadastroByCPF>(`${this.apiUrlLocal}`, {
      params,
    });

    return this.http.delete<CompradorExcluirCadastroByCPF>(`${this.apiUrlServer}`, {
      params,
    });
  }

}
