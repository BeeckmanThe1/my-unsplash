export const sessionOptions = {
    name: 'sid',
    secret: 'SECRET TO BIND SESSION',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 1000, // 1 minute
        httpOnly: false, // TODO
        secure: false,  // TODO
    }
}