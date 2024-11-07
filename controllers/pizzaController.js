const Pizza = require('../models/pizza');

//to generate unique pizza id
const generateUniquePizzaId = async () => {
  let id;
  let exists = true;
  
  while (exists) {
    id = Math.floor(100 + Math.random() * 900);
    const pizza = await Pizza.findOne({ pizza_id: id });
    if (!pizza) {
      exists = false;
    }
  }
  return id.toString();
};

//get all pizzas
const getPizzas = async (req, res) => {
  try {
    //console.log("enterd");
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (error) {
    res.status(400).json({ message: `error: ${error.message}` });
  }
};

//get pizza by pizza_id
const getPizzaById = async (req, res) => {
  try {
    console.log("pizza id", req.params.id); 
    const pizza = await Pizza.findOne({ pizza_id: req.params.id });
    if (!pizza) 
      return res.status(404).json({ message: 'Pizza not found' });

    res.json(pizza);
  } catch (error) {
    res.status(400).json({ message: `Error due to: ${error.message}` });
  }
};

// create a new pizza
const createPizza = async (req, res) => {
  try {
    const pizza_id = await generateUniquePizzaId();
    const { name, description, price, imageUrl, sizes, toppings } = req.body;

    const newPizza = new Pizza({
      name,
      description,
      price,
      imageUrl,
      sizes,
      toppings,
      pizza_id
    });
    await newPizza.save();
    res.status(200).json(newPizza);
  } catch (error) {
    res.status(400).json({ message: `error due to ${error.message}` });
  }
};

module.exports = { getPizzas, getPizzaById, createPizza };
