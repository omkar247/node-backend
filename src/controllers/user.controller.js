const userService = require('../services/user.service');

exports.getAll = (req, res) => {
  res.json(userService.getAllUsers());
};

exports.getById = (req, res) => {
  const user = userService.getUserById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
};