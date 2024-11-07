const express = require('express');
const { registerUser, loginUser } = require('../controllers/customerAuth');
const router = express.Router();

router.post('/v1/register', registerUser);
router.post('/v1/login', loginUser);

module.exports = router;
