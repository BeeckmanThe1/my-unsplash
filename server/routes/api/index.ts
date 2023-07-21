import { Router } from 'express';
import auth from './auth/index'
import users from './users/index'

const route = Router();

route.get('/', (req, res) => res.send('API'))
route.use('/users', users)
route.use('/auth', auth)

export default route