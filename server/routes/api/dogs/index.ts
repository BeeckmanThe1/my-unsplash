import {Router} from "express";
import {getDogs} from "../../../db/controllers/dog.controller";

const route = Router();

route.get('/', async (req, res) => {
    const dogs = await getDogs()

    return res.json(dogs)
})

export default route