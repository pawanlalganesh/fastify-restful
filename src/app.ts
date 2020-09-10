import * as fastify from 'fastify'
import routers from './router'
import WebSocket from 'ws';

const app: fastify.FastifyInstance = fastify.fastify({
  logger: { level: 'info' }
})

app.register(require('fastify-formbody'))
app.register(require('fastify-cors'), {})
app.register(require('fastify-knexjs'), {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '789124',
    database: 'test',
  },
  pool: {
    min: 0,
    max: 100
  },
  debug: true,
})

app.register(require('./plugins/jwt'), {
  secret: '1234567890xx'
})

app.register(require('./plugins/ws'), {
  path: '/ws',
  maxPayload: 1048576,
  verifyClient: function (info: any, next: any) {
    if (info.req.headers['x-fastify-header'] !== 'fastify') {
      return next(false)
    }
    next(true)
  }
})


app.ready(err => {
  if (err) throw err

  console.log('Websocket Server started.')

  app.ws
    .on('connection', (socket: any) => {
      console.log('Client connected.')

      socket.on('message', (msg: any) => {
        app.ws.clients.forEach((client: any) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(msg)
          }
        })
      }) // Creates an echo server

      socket.on('close', () => console.log('Client disconnected.'))
    })
})

app.register(routers)

export default app;