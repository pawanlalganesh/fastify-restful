import { FastifyInstance } from 'fastify';

import indexRoute from './controllers/index'
import demoRoute from './controllers/demo'
import testRoute from './controllers/test'
import userRoute from './controllers/users'
import loginRoute from './controllers/login'

export default async function router(fastify: FastifyInstance) {
  fastify.register(indexRoute, { prefix: '/' });
  fastify.register(demoRoute, { prefix: '/demo' });
  fastify.register(testRoute, { prefix: '/test' });
  fastify.register(userRoute, { prefix: '/users' });
  fastify.register(loginRoute, { prefix: '/login' });
}
