import next from 'next'
import routes from './routes/api'
import mongoose from 'mongoose'
import express from 'express'

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const server = express()

const init = async () => {
  const promisedAppSetup = app.prepare()
  const promisedDbSetup =  mongoose.connect('mongodb://localhost:27017/lel')

  await Promise.all([promisedAppSetup, promisedDbSetup])

  server.use('/api', routes)

  // we keep Nextjs folder-structure-based page routing
  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}

init()