export interface CompradorCadastro {
  nome: string;
  sobrenome: string;
  dataNascimento: Date;
  cpf: string;
  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento: string;
    cidade: {
      nome: string
      estado: {
        nome: string
      };
    };
    uf: string;
  }
}

export interface CompradorListagem extends CompradorAtualizarCadastro{
  nome: string;
  sobrenome: string;
  dataNascimento: Date;
}

export interface CompradorListagemPaginacao{
  size?: number;
  page?: number;
  sort?: string;
}

export interface CompradorListarByCPF{
  cpf: string;
}

export interface CompradorAtualizarCadastro{
  cpf: string;

  endereco: {
    cep: string;
    logradouro: string;
    bairro: string;
    numero: string;
    complemento: string;
    cidade: string;
    estado: string;
    uf: string;
  }
}

export interface CompradorExcluirCadastroByCPF extends CompradorListarByCPF{
  id?: number;
}
