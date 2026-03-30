const authService = require('../services/auth.service');

exports.signup = async (req, res) => {
  try {
    const user = await authService.signup(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.logout = (req, res) => {
  res.json({ message: "Logout successful (client should delete token)" });
};