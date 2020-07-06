// import { Router } from 'express';

// import SessionController from './app/controllers/SessionController';
// import UserController from './app/controllers/UserController';
// import ProductController from './app/controllers/ProductController';
// import CategoryController from './app/controllers/CategoryController';

// import authMiddlewware from './app/middlewares/auth';

const Router = require('express');
const SessionController = require('./app/controllers/SessionController');
const UserController = require('./app/controllers/UserController');
const ProductController = require('./app/controllers/ProductController');
const CategoryController = require('./app/controllers/CategoryController');
const authMiddlewware = require('./app/middlewares/auth');

const routes = new Router();

/*------------------------------------------------------------------*/

// Public access routes (no required admin authentication)

// Sessions
routes.post('/sessions', SessionController.store);

/*------------------------------------------------------------------*/

// Restricted access routes (required admin authentication)
routes.use(authMiddlewware);

// Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Categories
routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.show);
routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);

// Products
routes.get('/products', ProductController.index);
routes.get('/products/:id', ProductController.show);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

/*------------------------------------------------------------------*/

// export default routes;

module.exports = routes;
