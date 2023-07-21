import {SessionOptions} from "express-session";

export const sessionOptions: SessionOptions = {
    name: 'sid',
    secret: 'SECRET TO BIND SESSION',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 1 * 60 * 1000, // 1 minute
        httpOnly: false, // TODO
        secure: false,  // TODO
    }
}