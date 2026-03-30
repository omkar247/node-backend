const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const { readData, writeData } = require('../utils/fileHandler');
const config = require('../config/jwt');

exports.signup = async (data) => {
  const users = readData();

  const userExists = users.find(u => u.email === data.email);
  if (userExists) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    password: hashedPassword
  };

  users.push(newUser);
  writeData(users);

  // Generate JWT token for auto-login after signup
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    config.secret,
    { expiresIn: config.expiresIn }
  );

  return { user: newUser, token };
};

exports.login = async (data) => {
  const users = readData();

  const user = users.find(u => u.email === data.email);
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user.id, email: user.email },
    config.secret,
    { expiresIn: config.expiresIn }
  );

  return { user, token };
};