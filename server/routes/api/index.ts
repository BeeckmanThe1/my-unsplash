import { Router } from 'express';
import dog from './dogs/index'
import auth from './auth/index'

const route = Router();

route.get('/', (req, res) => res.send('API'))
route.use('/dogs', dog)
route.use('/auth', auth)

export default route