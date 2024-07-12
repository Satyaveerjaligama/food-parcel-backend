const mongoose = require("mongoose");
const { Restaurant } = require("../models/restaurant");
const { Customer } = require("../models/customer");
const { DeliveryAgent } = require("../models/deliveryAgent");
const { Orders } =require('../models/orders');
const { USER_TYPES } = require("../utilities/constants");
const {RESPONSE_MESSAGES} = require("../utilities/constants");
const { getModelAndKey } = require("../utilities/utilityFunctions");

exports.login = async (req, res) => {

  const {Model} = getModelAndKey(req.body.userType);

  if(!Model) {
    res.status(400).json({message: 'Model not found'});
    return;
  }

  Model.findOne({
    emailId: req.body.emailId,
    password: req.body.password,
  })
    .then((document) => {
      if (!document) {
        res.status(404).json({ message: RESPONSE_MESSAGES.enterValidCredentials });
      } else if (document && !(document?.isActive)) {
        res.status(403).json({ message: RESPONSE_MESSAGES.userIsInactive });
      } else {
        let responseObj;
        // response obj will be set based on the userType
        switch (req.body.userType) {
          case USER_TYPES.customer:
            responseObj = {
              name: document.fullName,
              userId: document.customerId,
              pincode: document.pincode,
            };
            break;
          case USER_TYPES.restaurant:
            responseObj = {
              name: document.restaurantName,
              userId: document.restaurantId,
              pincode: document.pincode,
            };
            break;
          case USER_TYPES.deliveryAgent:
            responseObj = {
              name: document.fullName,
              userId: document.deliveryAgentId,
              pincode: document.availabilityPincode,
            };
            break;
        }
        res.status(200).json({
          ...responseObj,
          phoneNumber: document.phoneNumber,
          emailId: document.emailId,
          address: document.address,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.fileUpload = async (req, res) => {
  try {
    const {Model, key} = getModelAndKey(req.body.type);

    if(!Model) {
      res.status(400).json({message: 'Model not found'});
      return;
    }

    const document = await Model.findOne({
      [key]: req.params.id,
    });

    if (!document) {
      return res.status(404).json({ message: "Details not found" });
    }

    const gfs = req.gfs;
    if (!gfs) {
      return res.status(500).json({ message: "gfs is not defined" });
    }

    // If there is already an image, delete the old image file from GridFS
    if (document.image) {
      await gfs.delete(
        new mongoose.Types.ObjectId(document.image),
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error occurred while deleting old image" });
          }
        }
      );
    }

    document.image = req.file.id;
    await document.save();

    res.json({ file: req.file, document });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const {Model, key} = getModelAndKey(req.params.type);

    if(!Model) {
      res.status(400).json({message: 'Model not found'});
      return;
    }

    const document = await Model.findOne({
      [key]: req.params.id
    });

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const gfs = req.gfs;
    if (!gfs) {
      return res.status(500).json({ message: 'gfs is not defined' });
    }

    if (!document.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    gfs.openDownloadStream(new mongoose.Types.ObjectId(document.image))
      .pipe(res);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// this api will set the isActive value to false
exports.delete = async(req, res) => {
  try{
    const {Model, key} = getModelAndKey(req.params.type);

    if(!Model) {
      res.status(400).json({message: 'Model not found'});
      return;
    }

    const document = await Model.updateOne(
      {
        [key]: req.params.id,
      },
      {
        $set: {
          isActive: false,
        },
      }
    );

    if(document.modifiedCount === 0 && document.matchedCount === 1) {
      res.status(400).json({message: 'Already in-active'});
      return;
    } else if(document.matchedCount !== 1) {
      res.status(404).json({message: 'Details not found'});
      return;
    }

    res.status(200).json({message: 'Deleted successfully'});
  } catch(err) {
    res.status(500).json({message: "Something went wrong"});
  }
};

// This api can you used to change the password of a user
exports.changePassword = async(req,res) => {
  try {
    const {Model, key} = getModelAndKey(req.body.type);

    if(!Model) {
      res.status(400).json('Model not found');
      return;
    }
    
    // updating the document based on req body
    const document = await Model.updateOne({
      [key] : req.body.userId,
      password: req.body.oldPassword,
    }, {
      $set: {
        password: req.body.newPassword,
      }
    })

    if(document.modifiedCount === 0 && document.matchedCount === 1) {
      res.status(400).json({message: 'Old and New passwords are same'});
      return;
    } else if(document.matchedCount !== 1) {
      res.status(400).json({message: 'User id or Old password is wrong'});
      return;
    }

    res.status(200).json({message: 'Updated successfully'});
  } catch(err) {
    res.status(500).json({message: err.message});
  }
};

// This api can be used to update the account details of the user
exports.updateAccountDetails = async(req,res) => {
  try{
    let Model;
    let key;
    const data = {};
    // setting the Model and key
    switch (req.body.type) {
      case USER_TYPES.customer:
        Model = Customer;
        key = USER_TYPES.customer+'Id';
        data.fullName = req.body.name;
        data.pincode = req.body.pincode;
        break;
      case USER_TYPES.restaurant:
        Model = Restaurant;
        key = USER_TYPES.restaurant+'Id';
        data.restaurantName = req.body.name;
        data.pincode = req.body.pincode;
        break;
      case USER_TYPES.deliveryAgent:
        Model = DeliveryAgent;
        key = USER_TYPES.deliveryAgent+'Id';
        data.fullName = req.body.name;
        data.availabilityPincode = req.body.pincode;
        break;
    }

    // trying to update the details
    const document = await Model.updateOne({
      [key]: req.body.userId
    }, {
      $set: {
        ...data,
        emailId: req.body.emailId,
        phoneNumber: req.body.phoneNumber
      }
    })

    if(document.modifiedCount === 0 && document.matchedCount === 1) {
      res.status(400).json({message: 'Existing data is same'});
      return;
    } else if(document.matchedCount !== 1) {
      res.status(404).json({message: 'Details not found'});
      return;
    }

    res.status(200).json({message: 'Updated successfully'});

  } catch(err) {
    res.status(500).json({message: err.message});
  }
};

// This api will return all the orders under customer, restaurant, delivery agent based on the user type
exports.getAllOrders = async(req,res) => {
  try {
    const {key} = getModelAndKey(req.body.userType);

    if(!key) {
      res.status(400).json({message: 'Key not found'});
      return;
    }

    const documents = await Orders.find({
      [key]: req.body.userId,
    })

    if(documents.length === 0) {
      res.status(404).json({message: 'Data not found'});
      return;
    }

    res.status(200).json(documents.reverse());
  } catch(err) {
    res.status(500).json({message: "Something went wrong"})
  }
};