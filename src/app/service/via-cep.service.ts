import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor(private http: HttpClient) { }

  url: string = 'https://viacep.com.br/ws/';

  buscaCep(cep: string): Observable<any>{
    return this.http.get<any>(`${this.url}${cep}/json/`);
  }

}
