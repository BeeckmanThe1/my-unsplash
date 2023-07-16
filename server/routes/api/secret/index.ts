import {Router} from "express";
import {getSecret} from "../../../controllers/secret.controller";

const route = Router();

route.get('/', getSecret)

export default route