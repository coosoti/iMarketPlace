import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();

router.get('/users', UsersController.userstest);
router.post('/users/register', UsersController.userregister);

module.exports = router;
