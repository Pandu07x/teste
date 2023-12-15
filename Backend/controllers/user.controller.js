// server/controllers/userController.js
const userModel = require('../models/user.model');

const loginUser = async (req, res) => {
  const { uname, password } = req.body;

  try {
    const user = await userModel.getUserByUsernameAndPassword(uname, password);

    if (user) {
      res.json({ success: true, message: 'Login successful', user });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { loginUser };
