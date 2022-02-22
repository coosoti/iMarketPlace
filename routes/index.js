import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import ProductsController from '../controllers/ProductsController';
import CartController from '../controllers/CartController';
import OrderController from '../controllers/OrderController';
import PaymentController from '../controllers/PaymentController';
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

// Carts
router.post('/api/v1/mycart', [verifyTokenAuthorization], CartController.createCart);
router.put('/api/v1/cart/:id', [verifyTokenAuthorization], CartController.updateCart);
router.delete('/api/v1/cart/:id', [verifyTokenAuthorization], CartController.delCart);
router.get('/api/v1/cart/find/:userId', CartController.getUserCart);
router.get('/api/v1/carts', [verifyTokenAdmin], CartController.getAllCarts);

// Orders
router.post('/api/v1/orders', [verifyToken], OrderController.createOrder);
router.put('/api/v1/order/:id', [verifyTokenAdmin], OrderController.updateOrder);
router.delete('/api/v1/order/:id', [verifyTokenAdmin], OrderController.delOrder);
router.get('/api/v1/orders/find/:userId', [verifyTokenAuthorization], OrderController.getUserOrders);
router.get('/api/v1/orders', [verifyTokenAdmin], OrderController.getAllOrders);
router.get('/api/v1/income', [verifyTokenAdmin], OrderController.getMonthlyIncome);

router.post('/api/v1/payment', PaymentController.makePayment);

module.exports = router;
