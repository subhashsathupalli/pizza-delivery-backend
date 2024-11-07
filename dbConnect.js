const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error while connecting to database:', error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
