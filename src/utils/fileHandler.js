const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/users.json');

exports.readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

exports.writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};