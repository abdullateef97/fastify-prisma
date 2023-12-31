import { FastifyInstance, FastifyPluginCallback } from 'fastify'
import { renderRoutes } from './routes'

export const router: FastifyPluginCallback = (
  fastify: FastifyInstance,
  opts,
  next
) => {
  fastify.decorateRequest('user', null)

  fastify.addHook('onRequest', (req, res, next) => {
    console.log('onRequest');
    console.log(req)
    next()
  })

  for (let route of renderRoutes) {
    fastify.route(route)
  }
  next()
}
