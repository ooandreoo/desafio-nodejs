import type { FastifyInstance, FastifyPluginAsync } from 'fastify'
import { getCachedData } from '../services/cacheService.js'

const dataRoute: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  fastify.get('/filmes', async (request, reply) => {
    const cache = getCachedData()

    if (cache.length === 0) {
      return reply.status(503).send({ 
        error: 'Dados ainda não carregados. Tente novamente em instantes.' 
      })
    }
    
    return cache
  })
}

export default dataRoute
