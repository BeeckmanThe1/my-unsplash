import next from 'next'
import routes from './routes/api'
import mongoose from 'mongoose'
import express from 'express'
import session from 'express-session'
import {authMiddleware} from "./routes/auth.midleware";
import {sessionOptions} from "./config/auth.sessions.config";

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()

const server = express()

const init = async () => {
    const promisedAppSetup = app.prepare()
    const connection = mongoose.connection.db;
    const promisedDbSetup = mongoose.connect('mongodb://localhost:27017/my-unsplash')


    await Promise.all([promisedAppSetup, promisedDbSetup])

    server.use(session(sessionOptions));
    server.use(express.json())  // bodyparser

    server.use('/api', authMiddleware, routes)
    server.all('*', authMiddleware, (req, res) => {
        return handle(req, res)
    })

    server.listen(port,() => console.log(`> Ready on http://localhost:${port}`))
}

init()