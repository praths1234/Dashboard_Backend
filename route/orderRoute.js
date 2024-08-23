import express from 'express';
import { createOrder , getOrderByUserId , cancelOrder , getAllOrders , updateOrderStatus , getOrdersByDateRange ,getOrdersByStatus} from '../controller/orderController.js';
const router = express.Router() ;
router.get('/user/:userId' , getOrderByUserId);
router.post('/' , createOrder);
router.patch('/cancel/:orderId' , cancelOrder);
router.get('/' , getAllOrders);
router.patch('/updateStatus/:orderId' , updateOrderStatus);
router.post('/by-date-range', getOrdersByDateRange );
router.get('/by-status/:status' , getOrdersByStatus);
export default router;