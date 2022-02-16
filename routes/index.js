import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

//User
router.post('/api/v1/users/register', AuthController.register);
router.get('/users', UsersController.userstest);
router.post('/users/register', UsersController.userregister);

module.exports = router;
