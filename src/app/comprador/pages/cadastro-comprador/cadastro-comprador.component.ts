import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViaCepService } from '../../../service/via-cep.service';
import { CompradorService } from '../../../service/comprador.service';
import { CompradorCadastro } from '../../../model/comprador';
import { MatDatepicker } from '@angular/material/datepicker';
import { validaIdade } from '../../../shared/verifica-idade-cliente';

@Component({
  selector: 'app-cadastro-comprador',
  templateUrl: './cadastro-comprador.component.html',
  styleUrl: './cadastro-comprador.component.scss'
})

export class CadastroCompradorComponent implements OnInit {
  @Output() pageView = new EventEmitter<any>();

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  dadosCadastro!: CompradorCadastro;

  isDisabled: boolean = true;

  constructor(
    private viaCepService: ViaCepService,
    private formBuilder: FormBuilder,
    private compradorService: CompradorService
  ){}

  ngOnInit(): void {
    this.inicializaFormGroup();
  }

  //inicializa form groups
  dataFirstFormGroup(){
    //dados pessoais
    this.firstFormGroup = this.formBuilder.group({
      nomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      sobrenomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimentoCtrl: ['', [Validators.required, validaIdade]],
      cpfCtrl: ['', [Validators.required, Validators.minLength(11)]],
    });
  }

  dataSecondFormGroup(){
    //dados do endereco
    this.secondFormGroup = this.formBuilder.group({
      cepCtrl: ['', Validators.required],
      logradouroCtrl: ['', Validators.required],
      bairroCtrl: ['', Validators.required],
      numeroCtrl: ['', Validators.required],
      complementoCtrl: ['', Validators.required],
      cidadeCtrl: ['', Validators.required],
      estadoCtrl: ['', Validators.required],
      ufCtrl: ['', Validators.required],
    });

    //irá mandar para a função se os campos estao validados ou nao
    this.secondFormGroup.statusChanges.subscribe((change) => {
      this.buttonDisabled();
    });
  }

  inicializaFormGroup() {
    //inicializa os dois forms groups vazios para os dados do stepper funcionarem
    this.dataFirstFormGroup();
    this.dataSecondFormGroup();

  }

  buttonDisabled() {
    this.isDisabled = !(
      this.firstFormGroup.valid && this.secondFormGroup.valid
    );
  }

  //captura e adiciona os dados de endereco na api viacep
  capturaDadosEndereco(data: any) {
    //irá sobrescrever os dados de endereço pelos novos dados passados;
    this.secondFormGroup.patchValue({
      logradouroCtrl: data.logradouro,
      bairroCtrl: data.bairro,
      cidadeCtrl: data.localidade,
      estadoCtrl: data.estado,
      ufCtrl: data.uf,
    });
  }

  limpaDadosEndereco() {
    //irá deixar os campos do endereço vazios (usar caso o cep tenha menos que 8 numeros ou seja inválido)

    this.secondFormGroup.patchValue({
      logradouroCtrl: '',
      bairroCtrl: '',
      cidadeCtrl: '',
      estadoCtrl: '',
      ufCtrl: '',
    });

    this.isDisabled = true;
  }

  buscaCep() {
    //remove a mascara do cep
    const cep = this.secondFormGroup.get('cepCtrl')?.value.replace(/\D/g, '');

    //somente caso o cep tenha 8 numeros a requisicao sera feita
    if (cep.length === 8) {
      this.viaCepService.buscaCep(cep).subscribe((data) => {
        if (data.erro) {
          console.log('O CEP digitado é inválido e não retornou um endereço!');
        } else {
          this.capturaDadosEndereco(data);
        }
      });
    }

    //caso a requisicao retorne erro ou nao tenha 8 numeros acusara erro
    this.limpaDadosEndereco();
  }

  //ira preenceher o json para atualizar o cadastro do comprador e depois enviar
  dadosAtualizados(){
    //ira utilizar esses dados para fazer o cadastro
    const dadosPessoais = this.firstFormGroup.value;
    const enderecoFormGroup = this.secondFormGroup.value;

    this.dadosCadastro = {
      nome: dadosPessoais.nomeCtrl,
      sobrenome: dadosPessoais.sobrenomeCtrl,
      dataNascimento: dadosPessoais.dataNascimentoCtrl,
      cpf: dadosPessoais.cpfCtrl,

      endereco: {
        cep : enderecoFormGroup.cepCtrl,
        logradouro: enderecoFormGroup.logradouroCtrl,
        bairro: enderecoFormGroup.bairroCtrl,
        numero: enderecoFormGroup.numeroCtrl,
        complemento: enderecoFormGroup.complementoCtrl,
        cidade: {
          nome: enderecoFormGroup.cidadeCtrl,
          estado: {
            nome: enderecoFormGroup.estadoCtrl
          }
        },
        uf: enderecoFormGroup.ufCtrl
      }
    }

  }

  realizaCadastro(){
    this.dadosAtualizados(); //os dados do comprador serao atualizados antes do envio para nao irem vazios
    this.compradorService.cadastrar(this.dadosCadastro).subscribe(
      (data)=>{
        alert("Sucesso!");
      }, (error)=>{
        alert("Erro!");
        console.log(error);
      }
    );
  }

  //ira bloquear eventos de digitacao ou colagem de data no input de data no cadastro
  bloquearDigitacao(event: KeyboardEvent): void {
    event.preventDefault();
  }

  bloquearColar(event: ClipboardEvent): void {
    event.preventDefault();
  }

  //abre o calendario do input de data caso haja o clique ou digitacao nele
  abrirDatepicker(picker: MatDatepicker<Date>) {
    picker.open();
  }

}
