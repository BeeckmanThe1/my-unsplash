"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../../../controllers/user.controller");
const route = (0, express_1.Router)();
route.get('/', user_controller_1.getUsers);
exports.default = route;
