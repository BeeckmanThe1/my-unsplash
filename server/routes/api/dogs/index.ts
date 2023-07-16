import {Router} from "express";
import {getDogs} from "../../../controllers/dog.controller";

const route = Router();

route.get('/', getDogs)

export default route