function generateUserId(type) {
  return type + "_" + Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = {
  generateUserId: generateUserId,
};
