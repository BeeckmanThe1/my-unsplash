import { Router } from 'express';
import dogRoutes from './dogs/index'

const route = Router();

route.get('/', (req, res) => res.send('API'))
route.use('/dogs', dogRoutes)

export default route