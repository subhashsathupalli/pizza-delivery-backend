# pizza-delivery-backend
Backend for a pizza delivery platform, providing APIs for user interaction, order management, and delivery status updates.

This is the backend for a simple pizza delivery system that allows users to register, log in, browse pizzas, place orders, and track their order history. The application is built using Node.js and Express, with MongoDB for data storage. It uses JWT (JSON Web Tokens) for secure authentication, and bcrypt.js for secure password storage.

Table of Contents
1. Functionality Overview
2. Setup Instructions
3. How to Use the API
4. Authentication & Security
5. Data Models
6. Error Handling

Functionality Overview
1. User Management:
Register: Allows users to create an account by providing their username, email, phone number, address, and password.
Login: Users can authenticate using their email and password. Upon successful login, they receive a JWT token for secure access to other endpoints.
2. Pizza Menu:
Browse Pizza Menu: Users can view available pizzas, including pizza details (e.g., price, description, toppings).
Admin Functionality: Admins can create new pizzas by providing a name, description, price, sizes, and available toppings.
3. Order Management:
Place Orders: Users can order pizzas by selecting the pizzas, specifying the quantity, and providing a delivery address.
View Order History: Users can view past orders.
Admin Functionality: Admins can update the status of an order (e.g., from "pending" to "delivered").
4. Authentication:
JWT Authentication: Protected routes require a valid JWT token for access.


Setup Instructions
To get the backend up and running locally, follow these steps:

1. Prerequisites:
Node.js
npm (Node Package Manager)
MongoDB (either local installation or MongoDB Atlas for cloud-based storage)

A. Clone the Repository:
  git clone https://github.com/subhashsathupalli/pizza-delivery-backend.git
B. Navigate to the Project Directory:
  cd pizza-delivery-backend
C. Install Dependencies:
  npm install
D. Modify Environment Variables (Optional): Edit the .env file with your MongoDB URI and JWT secret:
  MONGO_URI=mongodb://localhost:27017/pizzaApp   # Or use your MongoDB Atlas URI
  JWT_SECRET=your_jwt_secret_key_here            # Generate a secure key
E. Start the Server:
  npm start
  The backend server will run on http://localhost:5000.

How to Use the API
You can interact with the API using tools like Postman or cURL. Below are some of the important API endpoints:

1. User Management:
Register User (POST /api/customers/v1/register)
  Request Body:
    {
    "username": "subhash",
    "email": "iamsubhash02@gmail.com",
    "password": "Subhash@123",
    "address": "vizag",
    "phoneNumber": "9885165373"
    }

Login User (POST /api/customers/v1/login)
  Request Body:
    {
    "email": "iamsubhash202@gmail.com",
    "password": "Subhash@123"
    }

2. Pizza Menu:
Create Pizza (POST /api/pizzas/create)
  Request Body:
    {
    "name": "Veggie Supreme",
    "description": "A healthy and flavorful pizza loaded with fresh veggies.",
    "price": 220,
    "imageUrl": "https://example.com/images/veggie-supreme.jpg",
    "sizes": {
      "small": 220,
      "medium": 280,
      "large": 340
    },
    "toppings": ["bell peppers", "olives", "onions", "mushrooms", "spinach"]
   }

Get All Pizzas (GET /api/pizzas/getAll)
Example Response:
  [
  {
    "name": "Margherita",
    "price": 540,
    "sizes": {"small": 540, "medium": 600, "large": 650},
    "toppings": ["basil", "tomato", "mozzarella"]
  },
  ...
]

Get pizzas based on Pizza_id (GET /api/pizzas/:pizza_id/pizza)
Example Response:
  {
    "sizes": {
        "small": 220,
        "medium": 280,
        "large": 3409
    },
    "_id": "672b2aae705ea6e21b09990a",
    "name": "Veggie Supreme",
    "description": "A healthy and flavorful pizza loaded with fresh veggies.",
    "price": 220,
    "imageUrl": "https://example.com/images/veggie-supreme.jpg",
    "toppings": [
      "onions
     ]
    "pizza_id": "941",
    "__v": 0
  }

3. Order Management:
Place Order (POST /api/orders/newOrder)
  Request Body:
    {
   "userId": "6663",
    "pizzaItems": [
      {"pizzaId": "419", "quantity": 2, "size": "medium"},
      {"pizzaId": "904", "quantity": 1, "size": "large"}
    ],
    "deliveryAddress": "beach road"
    }    

Get User's Orders by using User id.(GET /api/orders/:unserId/userOrders)
  Example Response:
  [
    {
        "_id": "672b509e7cabaac9d286e944",
        "orderId": "114347",
        "userId": "6663",
        "pizzaItems": [
            {
                "pizzaId": "419",
                "quantity": 2,
                "size": "medium",
                "_id": "672b509e7cabaac9d286e945"
            },
            {
                "pizzaId": "904",
                "quantity": 1,
                "size": "large",
                "_id": "672b509e7cabaac9d286e946"
            }
        ],
        "totalPrice": 1550,
        "deliveryAddress": "beach road",
        "status": "delivered",
        "createdAt": "2024-11-06T11:18:54.967Z",
        "updatedAt": "2024-11-06T11:47:03.535Z",
        "__v": 0
    },

GET- Get the order details by using order id. (GET api/orders/:orderId/orderId)
  Example Response:
    {
    "_id": "672b509e7cabaac9d286e944",
    "orderId": "114347",
    "userId": "6663",
    "pizzaItems": [
        {
            "pizzaId": "419",
            "quantity": 2,
            "size": "medium",
            "_id": "672b509e7cabaac9d286e945"
        },
        {
            "pizzaId": "904",
            "quantity": 1,
            "size": "large",
            "_id": "672b509e7cabaac9d286e946"
        }
    ],
    "totalPrice": 1550,
    "deliveryAddress": "beach road",
    "status": "delivered",
    "createdAt": "2024-11-06T11:18:54.967Z",
    "updatedAt": "2024-11-06T11:47:03.535Z",
    "__v": 0
    }

Update Order Status (PATCH /api/orders/:orderID/status)
  Request Body:
    {
    "status": "delivered"
    }

Authentication & Security
1. JWT Authentication:
  After login, a JWT token is issued.
  Include the token in the Authorization header as a Bearer token for requests to protected routes.
2. Password Security:
  Passwords are hashed using bcrypt.js before being stored in the database. During login, the hashed password is compared with the provided password for authentication.

Data Models
1. User Model:
    const mongoose = require('mongoose');

    const userTable = new mongoose.Schema({
      username: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      address: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      userId: { type: String, required: true, unique: true },
    });

    module.exports = mongoose.model('user', userTable);

2. Pizza Model:
   const mongoose = require('mongoose');

   const pizzaTable = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true },
      imageUrl: { type: String },
      sizes: {
        small: { type: Number, required: true },
        medium: { type: Number, required: true },
        large: { type: Number, required: true },
      },
      toppings: [{ type: String }],
      pizza_id: { type: String, required: true, unique: true },
   });

   module.exports = mongoose.model('pizza', pizzaTable);

3. Order Model:
  const mongoose = require('mongoose');

  const orderstable = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    pizzaItems: [
      {
        pizzaId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        size: { type: String, enum: ['small', 'medium', 'large'], required: true },
      }
    ],
    totalPrice: { type: Number, required: true },
    deliveryAddress: { type: String, required: true },
    status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

module.exports = mongoose.model('order', orderstable);

Error Handling & Status Codes
  400 Bad Request: Invalid request format or missing required fields.
  404 Not Found: Requested resource (pizza, order, user) does not exist.
  500 Internal Server Error: General server error.
  200 OK: Successful request.


