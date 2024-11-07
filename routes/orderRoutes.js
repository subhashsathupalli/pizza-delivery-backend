const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrderById, updateOrderStatus } = require('../controllers/order');

router.post('/newOrder', createOrder);
router.get('/:userId/userOrders', getUserOrders);
router.get('/:orderId/orderId', getOrderById);
router.patch('/:orderId/status', updateOrderStatus);

module.exports = router;
