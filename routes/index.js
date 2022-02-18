import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } from '../utils/VerifyToken';

const router = Router();

// User Authentication
router.post('/api/v1/auth/register', AuthController.register);
router.post('/api/v1/auth/login', AuthController.login);

router.put('/api/v1/users/:id', [verifyTokenAuthorization], UsersController.verifyAuthToken);
router.delete('/api/v1/users/:id', UsersController.delUser, verifyTokenAuthorization);
router.get('/api/v1/users/find/:id', [verifyTokenAdmin], UsersController.getUser);
router.get('/api/v1/users', [verifyTokenAdmin], UsersController.getAllUsers);

module.exports = router;
