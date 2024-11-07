const express = require('express');
const router = express.Router();

const { getPizzas, getPizzaById, createPizza } = require('../controllers/pizzaController');

router.get('/getAll', getPizzas);
router.get('/:id/pizza', getPizzaById);
router.post('/create', createPizza);

module.exports = router;
