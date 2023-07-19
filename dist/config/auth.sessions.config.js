"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionOptions = void 0;
exports.sessionOptions = {
    name: 'sid',
    secret: 'SECRET TO BIND SESSION',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 1000,
        httpOnly: false,
        secure: false, // TODO
    }
};
