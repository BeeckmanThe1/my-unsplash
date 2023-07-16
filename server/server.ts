import next from 'next'
import routes from './routes/api'
import mongoose from 'mongoose'
import express from 'express'
import dogService from "./services/dog.service";
import session from 'express-session'
import getSessionStore from 'connect-mongodb-session'
const SessionStore = getSessionStore(session)

const sessionStore = new SessionStore({
    uri: 'mongodb://localhost:27017/sessions',
    collection: 'sessions'
});

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
    dogService.populateDogDB()

    server.use(session({
        name: 'sid',
        secret: 'key that will sign cookie',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: true,               // In producation
            maxAge: 1000 * 60 * 1,      // 1 minute
            sameSite: true
        },
        store: sessionStore
    }))
    server.use(express.json())
    server.use('/api', routes)
    // we keep Nextjs folder-structure-based page routing
    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port,() => console.log(`> Ready on http://localhost:${port}`))
}

init()