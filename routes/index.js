import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import AuthController from '../controllers/AuthController';
import { verifyToken, verifyTokenAuthorization, verifyTokenAdmin } from '../utils/VerifyToken';

const router = Router();

// User Authentication
router.post('/api/v1/auth/register', AuthController.register);
router.post('/api/v1/auth/login', AuthController.login);

router.put('/api/v1/users/:id', [verifyTokenAuthorization], UsersController.verifyAuthToken);
router.delete('/api/v1/users/:id', [verifyTokenAuthorization], UsersController.delUser);
router.get('/api/v1/users/find/:id', [verifyTokenAdmin], UsersController.getUser);
router.get('/api/v1/users', [verifyTokenAdmin], UsersController.getAllUsers);
router.get('/api/v1/users/stats', [verifyTokenAdmin], UsersController.getUserStats);

// Products
router.post('/api/v1/products', [verifyTokenAdmin], ProductsController.createProduct);
router.put('/api/v1/products/:id', [verifyTokenAdmin], ProductsController.updateProduct);
router.delete('/api/v1/products/:id', [verifyTokenAdmin], ProductsController.delProduct);
router.get('/api/v1/products/find/:id', ProductsController.getProduct);
router.get('/api/v1/products', ProductsController.getAllProducts);

module.exports = router;
