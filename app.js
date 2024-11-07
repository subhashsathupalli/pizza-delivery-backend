const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./dbConnect');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes');
const pizzaRoutes = require('./routes/pizzaRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
dbConnection();

const app = express();

app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
