import {Router} from "express";
import {registerUser, login, logout, ping} from "../../../controllers/auth.controller";

const route = Router();

route.post('/register', registerUser)
route.post('/login', login)
route.post('/logout', logout)
route.get('/ping', ping)

export default route