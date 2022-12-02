import express from 'express'
import OrderController from '../controllers/OrdersController.js';
const router = express.Router();

router.post('/orders/list',OrderController.getOrders)
router.post('/orders/create',OrderController.addOrder)
router.post('/orders/search',OrderController.searchOrder)
router.patch('/orders/update',OrderController.updateOrder)
router.delete('/orders/delete',OrderController.deleteOrder)

export default router