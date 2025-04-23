import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViaCepService } from '../../../service/via-cep.service';
import { CompradorService } from '../../../service/comprador.service';
import {
  CompradorAtualizarCadastro,
  CompradorListarByCPF,
} from '../../../model/comprador';

@Component({
  selector: 'editar-cadastro',
  templateUrl: './editar-cadastro.component.html',
  styleUrl: './editar-cadastro.component.scss',
})
export class EditarCadastroComponent {
  @Output() pageView = new EventEmitter<any>();
  @Input() userAccess!: string;

  dadosCadastro!: CompradorAtualizarCadastro;
  identificadorUsuario!: CompradorListarByCPF;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isDisabled: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private compradorService: CompradorService
  ) {}

  //inicializa form groups
  dataFirstFormGroup(){
    //dados pessoais
    this.firstFormGroup = this.formBuilder.group({
      nomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      sobrenomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimentoCtrl: ['', Validators.required],
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

  //busca os dados na api e preenche o stepper
  preencheDadosCadastro(data: any) {
    this.firstFormGroup.patchValue({
      nomeCtrl: data.nome,
      sobrenomeCtrl: data.sobrenome,
      dataNascimentoCtrl: data.dataNascimento,
      cpfCtrl: data.cpf,
    });

    this.secondFormGroup.patchValue({
      cepCtrl: data.endereco.cep,
      logradouroCtrl: data.endereco.logradouro,
      bairroCtrl: data.endereco.bairro,
      numeroCtrl: data.endereco.numero,
      complementoCtrl: data.endereco.complemento,
      cidadeCtrl: data.endereco.cidade,
      estadoCtrl: data.endereco.estado,
      ufCtrl: data.endereco.uf,
    });
  }

  carregaDadosAPI(){
    //irá preencher o stepper com os dados retornados da api
    this.compradorService.listarByCPF(this.identificadorUsuario).subscribe({
      next: (data) => {
      this.preencheDadosCadastro(data);
      },
      error: (err) => {
        console.error('Erro ao buscar comprador:', err);
      }
    });
  }

  //resolve o erro do cpf undefined usando o onChanges
  ngOnChanges(chages: SimpleChanges){
    if(chages['userAccess'] && this.userAccess) {
      this.identificadorUsuario = { cpf: this.userAccess };

      this.inicializaFormGroup();
      this.carregaDadosAPI();
    }

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
    //ira preencher os dados de atualizacao do cliente com os valores que estiverem nos campos stepper
    //e utilizara esses dados para atualizar o cadastro
    const enderecoFormGroup = this.secondFormGroup.value;

    this.dadosCadastro = {

      cpf: this.userAccess,

      endereco: {
        cep : enderecoFormGroup.cepCtrl,
        logradouro: enderecoFormGroup.logradouroCtrl,
        bairro: enderecoFormGroup.bairroCtrl,
        numero: enderecoFormGroup.numeroCtrl,
        complemento: enderecoFormGroup.complementoCtrl,
        cidade: enderecoFormGroup.cidadeCtrl,
        estado: enderecoFormGroup.estadoCtrl,
        uf: enderecoFormGroup.ufCtrl
      }
    }

  }

  enviaAtualizacaoCadastro(){
    this.dadosAtualizados(); //os dados do comprador serao atualizados antes do envio para nao irem vazios

    this.compradorService.atualizarCadastro(this.dadosCadastro).subscribe({
      next: (data)=>{
        alert("SUCESSO");
      }, error : (error)=>{
        //ira capturar a mensagem de erro trazida da api
        console.log(error);
      }
    })
  }

}
