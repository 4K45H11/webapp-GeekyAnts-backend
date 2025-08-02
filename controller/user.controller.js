const User = require('../models/User.model');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "error fetching users", error: error.message });
  }
};
