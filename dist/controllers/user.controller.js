"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUsersOld = void 0;
const user_schema_1 = require("../db/schemas/user.schema");
const getUsersOld = async () => await user_schema_1.User.find({});
exports.getUsersOld = getUsersOld;
const getUsers = async (req, res) => {
    const allUsers = await (0, exports.getUsersOld)();
    return res.json(allUsers);
};
exports.getUsers = getUsers;
