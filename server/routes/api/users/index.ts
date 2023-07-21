import {Router} from "express";
import {getUsers,getUser, getCurrentUser, deleteUser} from "../../../controllers/user.controller";

const route = Router();

route.get('/current', getCurrentUser)
route.get('/:id', getUser)
route.get('/', getUsers)

route.delete('/:id', deleteUser)

export default route