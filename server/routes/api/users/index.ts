import {Router} from "express";
import {getUsers} from "../../../controllers/user.controller";

const route = Router();

route.get('/', getUsers)

export default route