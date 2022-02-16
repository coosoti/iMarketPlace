import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

//User
router.post('/api/v1/auth/register', AuthController.register);
router.post('/api/v1/auth/login', AuthController.login);

router.get('/users', UsersController.userstest);
router.post('/users/register', UsersController.userregister);

module.exports = router;
