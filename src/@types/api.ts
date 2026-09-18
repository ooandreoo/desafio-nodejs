export interface Request {
  filmes: Filme[]
}

export interface Filme {
  titulo: string
  diretor: string
  ano: number
  genero: string[]
  duracao: number
  ratings: Rating[]
  sinopse: Sinopse[]
  orcamento: string
  bilheteria: string
  premios: Premio[]
}

export interface Rating {
  valor: number
  fonte: string
}

export interface Sinopse {
  texto: string
  idioma: string
}

export interface Premio {
  nome: string
  relevancia: number
}

export interface FilmeResponse {
  titulo: string
  ano: number
  diretor: string
  genero: string[]
  duracaoSegundos: number
  notaIMDb: string
  lucro: string
  maiorPremiacao: string
  sinopse: string
}
