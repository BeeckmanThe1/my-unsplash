import { Router } from 'express';
import dogs from './dogs/index'
import auth from './auth/index'
import users from './users/index'
import secret from './secret/index'

const route = Router();

route.get('/', (req, res) => res.send('API'))
route.use('/dogs', dogs)
route.use('/users', users)
route.use('/auth', auth)
route.use('/secret', secret)

export default route