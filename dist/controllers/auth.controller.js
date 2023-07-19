"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.logout = exports.login = exports.registerUser = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const registerUser = async (req, res) => {
    const { username, password } = req.body || {};
    const isMissingFields = !username || !password;
    const isUsernameAvailable = await user_service_1.default.validateUsernameAvailability(username);
    if (isMissingFields) {
        // Send an error response if any required fields are missing
        return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!isUsernameAvailable) {
        return res.status(409).json({ message: 'Username already taken' });
    }
    await user_service_1.default.createUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
};
exports.registerUser = registerUser;
// todo: write tests + try catch
const login = async (req, res, next) => {
    const { username, password } = req.body || {};
    const user = await user_service_1.default.getUserByUsername(username);
    const isValidCredentials = await user_service_1.default.validateLogin(username, password);
    if (isValidCredentials) {
        req.session.regenerate((err) => {
            if (err)
                next(err);
            req.session.userId = user === null || user === void 0 ? void 0 : user.id;
            req.session.save((err) => {
                if (err)
                    return next(err);
                res.status(200).json({ message: 'Login successful' });
                //res.redirect('/')
            });
        });
    }
    else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    req.session.userId = null;
    req.session.save(err => {
        if (err)
            next(err);
        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err)
                next(err);
            res.redirect('/');
        });
    });
    // res.status(200).json({message: 'Logout successful'});
};
exports.logout = logout;
const ping = async (req, res) => {
    var _a;
    const userId = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
    const user = await user_service_1.default.getUserById(userId);
    if (!userId) {
        return res.status(401).json({ message: 'not logged in' });
    }
    res.status(200).json({ message: 'PING', user });
};
exports.ping = ping;
