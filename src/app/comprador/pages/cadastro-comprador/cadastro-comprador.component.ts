import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViaCepService } from '../../../service/via-cep.service';

@Component({
  selector: 'app-cadastro-comprador',
  templateUrl: './cadastro-comprador.component.html',
  styleUrl: './cadastro-comprador.component.scss'
})

export class CadastroCompradorComponent implements OnInit {

  constructor(){}

  ngOnInit(): void {
    console.log("Comprador cadastro funcionando!")
  }

}
