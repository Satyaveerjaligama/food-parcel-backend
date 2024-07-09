const {Customer} = require('../models/customer');
const {Restaurant} = require('../models/restaurant');
const {DeliveryAgent} = require('../models/deliveryAgent');
const {MenuItem} = require('../models/menuItem'); 
const { USER_TYPES } = require('./constants');

function generateUserId(type) {
  return type + "_" + Math.floor(100000 + Math.random() * 900000).toString();
}

const downloadImage = (gfs, imageId) => {
  return new Promise((resolve, reject) => {
    let chunks = [];
    const downloadStream = gfs.openDownloadStream(imageId);

    downloadStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // if image is not present or any other error
    downloadStream.on("error", (err) => {
      resolve("");
    });

    // concating and converting to base 64
    downloadStream.on("end", () => {
      const binaryData = Buffer.concat(chunks);
      resolve(binaryData.toString("base64"));
    });
  });
};

const getCurrentDateAndTime = ()  => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}`;

  return {date, time};
};

// This function will take the type and return the Model and key
const getModelAndKey = (type) => {
  let Model;
  let key;
  switch (type) {
    case USER_TYPES.customer:
      Model = Customer;
      key = USER_TYPES.customer+'Id';
      break;
    case USER_TYPES.restaurant:
      Model = Restaurant;
      key = USER_TYPES.restaurant+'Id';
      break;
    case USER_TYPES.deliveryAgent:
      Model = DeliveryAgent;
      key = USER_TYPES.deliveryAgent+'Id';
      break;
    case 'menuItem':
      Model = MenuItem;
      key = "itemId";
      break;
  }

  return {Model, key}
};

module.exports = {
  generateUserId,
  downloadImage,
  getCurrentDateAndTime,
  getModelAndKey,
};
