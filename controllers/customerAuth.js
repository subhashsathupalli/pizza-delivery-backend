const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//to generate 4 digit unique id
const generateId = () => {
  return Math.floor(1000 + Math.random() * 9000); 
};

const isIdExist = async (id) => {
  const userWithId = await User.findOne({ id }); 
  return userWithId !== null;
};

//signin
const registerUser = async (req, res) => {
  const { username, email, password, address, phoneNumber } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(200).json({ message: 'User already exists' });

    let id = generateId();
    while (await isIdExist(id)) {
      id = generateId();  
    }
    console.log(`generated user id: ${id}`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      userId: id, 
    });
    await user.save();
    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({
      message: 'User successfully created',
      userId: user.userId,  
      user,
    });
  } catch (error) {
    console.error('Error while signup due to:\n', error);
    res.status(400).json({ message: `Error while signup due to: ${error.message}` });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign({ userId: user.userId }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.json({    
      message: 'Login successful',
      userId: user.userId,  
      token,
    });
  } catch (error) {
    console.error('Error while login due to:\n', error);
    res.status(400).json({ message: `Error while login due to: ${error.message}` });
  }
};

module.exports = { registerUser, loginUser };