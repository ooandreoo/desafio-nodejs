import type { FilmeResponse, Filme, Premio, Request, Rating, Sinopse } from '../@types/api.ts'
import { env } from "../config/env.js"

// Estado interno encapsulado no serviço
let memoryCache: FilmeResponse[] = []

function obterLucro(orcamento: string, bilheteria: string): string {
  const orcamentoList: string[] = orcamento.substr(1).split(' ') 
  const bilheteriaList: string[] = bilheteria.substr(1).split(' ')

  const orcamentoNumero: number = Number.parseFloat(orcamentoList[0]??'0')
  const bilheteriaNumero: number = Number.parseFloat(bilheteriaList[0]??'0')

  const orcamentoMultiplier: number = (orcamentoList[1]??'').includes('bilh') ? 1000 : 1
  const bilheteriaMultiplier:number = (bilheteriaList[1]??'').includes('bilh') ? 1000 : 1

  let lucroNumber: number = bilheteriaNumero*bilheteriaMultiplier-orcamentoNumero*orcamentoMultiplier

  if(lucroNumber<0)
    lucroNumber = 0

  const lucroQuantidade: string = lucroNumber>1000 ? (lucroNumber/1000 === 1 ? 'bilhão':'bilhões') : (lucroNumber === 1 ? 'milhão' : 'milhões')

  const lucroText: string = `$${lucroNumber>1000 ? lucroNumber/1000 : lucroNumber} ${lucroQuantidade}`

  return lucroText
}

function obterMaiorPremiacao(premios: Premio[]): string{
  let maiorPremiacaoPuntuacao: number = 0
  let maiorPremiacaoNome: string = ''
  
  premios.forEach((premio: Premio) => {
    if(premio.relevancia>maiorPremiacaoPuntuacao){
      maiorPremiacaoPuntuacao = premio.relevancia
      maiorPremiacaoNome = premio.nome
    }
  });
  return maiorPremiacaoNome;
}

function obterNotaIMDb(ratings: Rating[]): string{
  const ratingIMDb: Rating[] = ratings.filter((rating: Rating) => rating.fonte === "IMDb")
  if(ratingIMDb.length === 1){
    return (ratingIMDb[0]??{'valor': 0}).valor.toString()
  }
  return "Não tem nota IMDb registrada para esse filme"
}

function obterSinopsePTBR(sinopse: Sinopse[]): string{
  const sinopsePTBR: Sinopse[] = sinopse.filter((element: Sinopse) => element.idioma === "pt-br")
  if(sinopsePTBR.length === 1){
    return (sinopsePTBR[0]??{"texto":""}).texto
  }
  return "Não tem sinopse em portugués"
}

export async function fetchAndRefreshData(): Promise<void> {
  try {
    const response = await fetch(`${env.THIRD_PARTY_API_URL}`)
    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.statusText}`)
    }
    
    const jsonData = (await response.json()) as Request

    jsonData.filmes.forEach((element: Filme) => {

      const lucroText: string = obterLucro(element.orcamento, element.bilheteria)

      const maiorPremiacao: string = obterMaiorPremiacao(element.premios)

      const notaIMDb: string = obterNotaIMDb(element.ratings)

      const sinopse: string = obterSinopsePTBR(element.sinopse)

      memoryCache.push({
        titulo: element.titulo,
        ano: element.ano,
        diretor: element.diretor,
        genero: element.genero,
        duracaoSegundos: element.duracao*60,
        notaIMDb: notaIMDb,
        lucro: lucroText,
        maiorPremiacao: maiorPremiacao,
        sinopse: sinopse
      })

    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    throw new Error(`Falha no refresh do cache: ${errorMessage}`)
  }
}

export function getCachedData(): FilmeResponse[] {
  return memoryCache
}
