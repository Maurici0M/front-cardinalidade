import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViaCepService } from '../../../service/via-cep.service';

@Component({
  selector: 'app-cadastro-comprador',
  templateUrl: './cadastro-comprador.component.html',
  styleUrl: './cadastro-comprador.component.scss'
})

export class CadastroCompradorComponent implements OnInit {
  @Output() pageView = new EventEmitter<any>();

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isDisabled: boolean = true;

  constructor(private formBuilder: FormBuilder, private viaCepService: ViaCepService){}

  ngOnInit() {
    this.inicializaFormGroup();
  }

  buttonDisabled(){
    this.isDisabled = !(this.firstFormGroup.valid && this.secondFormGroup.valid);
  }

  inicializaFormGroup(){
    //inicializa os dois forms groups para os dados do stepper funcionarem

     //dados pessoais
    this.firstFormGroup = this.formBuilder.group({
      nomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      sobrenomeCtrl: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimentoCtrl: ['', Validators.required],
      cpfCtrl: ['', [Validators.required, Validators.minLength(11)]]
    });

    //dados do endereco
    this.secondFormGroup = this.formBuilder.group({
      cepCtrl: ['', Validators.required],
      logradouroCtrl: ['', Validators.required],
      bairroCtrl: ['', Validators.required],
      numeroCtrl: ['', Validators.required],
      complementoCtrl: ['', Validators.required],
      cidadeCtrl: ['', Validators.required],
      estadoCtrl: ['', Validators.required],
      ufCtrl: ['', Validators.required]
    });

    //irá mandar para a função se os campos estao validados ou nao
    this.secondFormGroup.statusChanges.subscribe(change=>{
      this.buttonDisabled();
    })

  }

  capturaDadosEndereco(data: any){

    this.secondFormGroup.patchValue({
      logradouroCtrl: data.logradouro,
      bairroCtrl: data.bairro,
      cidadeCtrl: data.localidade,
      estadoCtrl: data.estado,
      ufCtrl: data.uf,
    });

  }

  limpaDadosEndereco(){
    //irá deixar os campos do endereço vazios (usar caso o cep tenha menos que 8 numeros ou seja inválido)

    this.secondFormGroup.patchValue({
      logradouroCtrl: '',
      bairroCtrl: '',
      cidadeCtrl: '',
      estadoCtrl: '',
      ufCtrl: '',
    })

    this.isDisabled = true;
  }

  buscaCep(){
    const cep = this.secondFormGroup.get('cepCtrl')?.value.replace(/\D/g, ''); //remove a mascara do cep

    //somente caso o cep tenha 8 numeros a requisicao sera feita
    if(cep.length === 8){

      this.viaCepService.buscaCep(cep).subscribe(
        (data)=> {

          if(data.erro){
            console.log("O CEP digitado é inválido e não retornou um endereço!")
          }

          else{
            this.capturaDadosEndereco(data);
          }
        }
      )

    }

    //caso a requisicao retorne erro ou nao tenha 8 numeros acusara erro
    this.limpaDadosEndereco();

  }

}
