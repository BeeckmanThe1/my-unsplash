"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("../db/schemas/user.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (username, password) => {
    const hashedPwd = await bcrypt_1.default.hash(password, 10);
    const newUser = new user_schema_1.User({ username, pwd: hashedPwd });
    return await newUser.save();
};
const validateUsernameAvailability = async (username) => {
    const usersWithThisUsername = await user_schema_1.User.find({ username: username });
    const usernameIsAlreadyTaken = !!(usersWithThisUsername === null || usersWithThisUsername === void 0 ? void 0 : usersWithThisUsername.length);
    return !usernameIsAlreadyTaken;
};
const getUserByUsername = async (username) => await user_schema_1.User.findOne({ username });
const getUserById = async (id) => await user_schema_1.User.findById(id);
const validateLogin = async (username, password) => {
    const user = await user_schema_1.User.findOne({ username: username });
    if (!user || !username || !password)
        return false;
    return await bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.pwd);
};
exports.default = {
    createUser,
    validateUsernameAvailability,
    validateLogin,
    getUserByUsername,
    getUserById
};
