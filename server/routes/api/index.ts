import { Router } from 'express';
import dogRoute from './dogs/index'

const route = Router();

route.get('/', (req, res) => res.send('API'))
route.use('/dogs', dogRoute)

export default route