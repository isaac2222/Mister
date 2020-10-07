import * as jsonServer from 'json-server'
import {Express} from 'express'

import * as fs from 'fs'
import * as https from 'https'

import {handleAuthentication} from './auth'
import {handleAuthorization} from './authz'


const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem'),
  
}

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)



// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.send(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

//Midleware de login
server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)
// Use default router
server.use(router)

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})




https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on localhost port 3001')
})