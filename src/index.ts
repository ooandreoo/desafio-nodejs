import 'dotenv/config'
import Fastify from 'fastify'
import type { FastifyInstance } from 'fastify'
import { fetchAndRefreshData } from './services/cacheService.js'
import dataRoute from './routes/dataRoute.js'

const fastify: FastifyInstance = Fastify({ logger: true })

const REFRESH_INTERVAL_MINUTES = 5
const REFRESH_INTERVAL_MS = REFRESH_INTERVAL_MINUTES * 60 * 1000

const start = async (): Promise<void> => {
  try {
    // 1. Busca inicial antes de subir o servidor
    fastify.log.info('Buscando dados iniciais...')
    await fetchAndRefreshData()

    // 2. Configura o timer periódico
    setInterval(async () => {
      try {
        await fetchAndRefreshData()
        fastify.log.info('Cache atualizado via background job.')
      } catch (error) {
        fastify.log.error(error)
      }
    }, REFRESH_INTERVAL_MS)

    // 3. Registra as rotas (plugins)
    await fastify.register(dataRoute)

    // 4. Sobe o servidor
    await fastify.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
