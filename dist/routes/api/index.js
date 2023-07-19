"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./auth/index"));
const index_2 = __importDefault(require("./users/index"));
const route = (0, express_1.Router)();
route.get('/', (req, res) => res.send('API'));
route.use('/users', index_2.default);
route.use('/auth', index_1.default);
exports.default = route;
