const { readData } = require('../utils/fileHandler');

exports.getAllUsers = () => {
  return readData();
};

exports.getUserById = (id) => {
  const users = readData();
  return users.find(u => u.id === id);
};