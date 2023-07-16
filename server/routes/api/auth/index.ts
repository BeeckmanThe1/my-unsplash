import {Router} from "express";
import {registerUser, login, logout} from "../../../controllers/auth.controller";

const route = Router();

route.post('/register', registerUser)
route.post('/login', login)
route.post('/logout', logout)

export default route