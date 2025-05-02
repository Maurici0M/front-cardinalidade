import { AbstractControl } from "@angular/forms";

export function validaIdade(control: AbstractControl){
  const dataNascimento = control.value;

  if (!dataNascimento) {
    return null;
  }

  const hoje = new Date();
  const nascimento = new Date(dataNascimento);

  const idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();
  const dia = hoje.getDate() - nascimento.getDate();

  const fezAniversario = mes > 0 || (mes === 0 && dia >= 0);

  const idadeFinal = fezAniversario ? idade : idade - 1;

  return idadeFinal >= 18 ? null : { menorDeIdade: true };

}
