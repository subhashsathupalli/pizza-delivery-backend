const Order = require('../models/order');
const Pizza = require('../models/pizza');
const User = require('../models/user');

const calculateTotalPrice = async (pizzaItems) => {
  let totalPrice = 0;
  for (const item of pizzaItems) {
    const pizza = await Pizza.findOne({ pizza_id: item.pizzaId });
    if (!pizza) throw new Error('Pizza not found');
    const pizzaPrice = pizza.sizes[item.size] * item.quantity; 
    totalPrice += pizzaPrice;
  }
  return totalPrice;
};

const generateUniqueOrderId = async () => {
  let orderId;
  let exists = true;
  while (exists) {
    orderId = Math.floor(100000 + Math.random() * 900000).toString(); 
    const order = await Order.findOne({ orderId });
    if (!order) exists = false; 
  }
  return orderId;
};

// place a new order
const createOrder = async (req, res) => {
  const { userId, pizzaItems, deliveryAddress } = req.body; 
  console.log("body:", req.body); 

  try {
    console.log("Looking for user with userId:", userId);
    const user = await User.findOne({ userId: userId });
    
    if (!user) {
      console.log("User not found with userId:", userId);  
      return res.status(404).json({ message: 'User not found' });
    }

    for (const item of pizzaItems) {
      console.log(`Looking for pizza with pizzaId: ${item.pizzaId}`);

      const pizza = await Pizza.findOne({ pizza_id: item.pizzaId }); 

      if (!pizza) {
        console.log(`Pizza with ID ${item.pizzaId} not found`);
        return res.status(404).json({ message: `Pizza with ID ${item.pizzaId} not found` });
      }
      console.log(`Found pizza: ${pizza.name} for pizzaId: ${item.pizzaId}`);
    }

    const orderId = await generateUniqueOrderId();
    console.log("Generated orderId:", orderId);

    const totalPrice = await calculateTotalPrice(pizzaItems);
    console.log("Calculated totalPrice:", totalPrice);

    const newOrder = new Order({
      orderId,
      userId,
      pizzaItems,
      totalPrice,
      deliveryAddress
    });

    await newOrder.save();
    res.status(200).json({ message: 'Order placed successfully', order: newOrder });

  } catch (error) {
    console.error('Error creating order:', error);
    res.status(400).json({ message: `Error due to ${error.message}` });
  }
};

//get all orders for a user
const getUserOrders = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });

    console.log("orders\n", orders);
    if(!orders) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(400).json({ message: `Error due to ${error.message}` });
  }
};

// Get a specific order by its orderId
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ orderId: orderId })
    
    console.log("order details\n", order);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(400).json({ message: `Error due to ${error.message}` });
  }
};

// Update the status of an order
const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    if (!['pending', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const order = await Order.findOne({ orderId: orderId.trim() })
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    order.updatedAt = Date.now();
    await order.save();

    console.log("status updated\n", order);
    res.status(200).json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(400).json({ message: `Error due to ${error.message}` });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus
};
