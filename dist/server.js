"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const api_1 = __importDefault(require("./routes/api"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const auth_midleware_1 = require("./routes/auth.midleware");
const auth_sessions_config_1 = require("./config/auth.sessions.config");
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const server = (0, express_1.default)();
const init = async () => {
    const promisedAppSetup = app.prepare();
    const connection = mongoose_1.default.connection.db;
    const promisedDbSetup = mongoose_1.default.connect('mongodb://localhost:27017/my-unsplash');
    await Promise.all([promisedAppSetup, promisedDbSetup]);
    server.use((0, express_session_1.default)(auth_sessions_config_1.sessionOptions));
    server.use(express_1.default.json()); // bodyparser
    server.use('/api', auth_midleware_1.authMiddleware, api_1.default);
    server.all('*', auth_midleware_1.authMiddleware, (req, res) => {
        return handle(req, res);
    });
    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
};
init();
