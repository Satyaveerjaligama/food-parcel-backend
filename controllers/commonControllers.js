const mongoose = require("mongoose");
const { Restaurant } = require("../models/restaurant");
const { Customer } = require("../models/customer");
const { DeliveryAgent } = require("../models/deliveryAgent");
const { MenuItem } = require('../models/menuItem');
const { USER_TYPES } = require("../utilities/constants");
const {RESPONSE_MESSAGES} = require("../utilities/constants");

exports.login = async (req, res) => {
  let Model;
  // model will be set based on the userType
  switch (req.body.userType) {
    case USER_TYPES.customer:
      Model = Customer;
      break;
    case USER_TYPES.restaurant:
      Model = Restaurant;
      break;
    case USER_TYPES.deliveryAgent:
      Model = DeliveryAgent;
      break;
  }

  Model.find({
    emailId: req.body.emailId,
    password: req.body.password,
  })
    .then((documents) => {
      if (documents.length === 0) {
        res.status(404).json({ message: RESPONSE_MESSAGES.detailsNotFound });
      } else if (!documents[0].isActive) {
        res.status(403).json({ message: RESPONSE_MESSAGES.userIsInactive });
      } else {
        let responseObj;
        // response obj will be set based on the userType
        switch (req.body.userType) {
          case USER_TYPES.customer:
            responseObj = {
              name: documents[0].fullName,
              userId: documents[0].customerId,
              pincode: documents[0].pincode,
            };
            break;
          case USER_TYPES.restaurant:
            responseObj = {
              name: documents[0].restaurantName,
              userId: documents[0].restaurantId,
              pincode: documents[0].pincode,
            };
            break;
          case USER_TYPES.deliveryAgent:
            responseObj = {
              name: documents[0].fullName,
              userId: documents[0].deliveryAgentId,
              pincode: documents[0].availabilityPincode,
            };
            break;
        }
        res.status(200).json(responseObj);
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

exports.fileUpload = async (req, res) => {
  try {
    let model;
    let key;
    switch (req.body.type) {
      case USER_TYPES.customer:
        model = Customer;
        key = USER_TYPES.customer+'Id';
        break;
      case USER_TYPES.restaurant:
        model = Restaurant;
        key = USER_TYPES.restaurant+'Id';
        break;
      case USER_TYPES.deliveryAgent:
        model = DeliveryAgent;
        key = USER_TYPES.deliveryAgent+'Id';
        break;
      case 'menuItem':
        model = MenuItem;
        key = "itemId";
        break;
    }

    const document = await model.findOne({
      [key]: req.params.id,
    });

    if (!document) {
      return res.status(404).json({ msg: "Details not found" });
    }

    const gfs = req.gfs;
    if (!gfs) {
      return res.status(500).json({ error: "gfs is not defined" });
    }

    // If there is already an image, delete the old image file from GridFS
    if (document.image) {
      await gfs.delete(
        new mongoose.Types.ObjectId(document.image),
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ msg: "Error occurred while deleting old image" });
          }
        }
      );
    }

    document.image = req.file.id;
    await document.save();

    res.json({ file: req.file, document });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getImageById = async (req, res) => {
  try {
    let model;
    let key;
    switch(req.params.type) {
      case USER_TYPES.customer:
        model = Customer;
        key = USER_TYPES.customer+'Id';
        break;
      case USER_TYPES.restaurant:
        model = Restaurant;
        key = USER_TYPES.restaurant+'Id';
        break;
      case USER_TYPES.deliveryAgent:
        model = DeliveryAgent;
        key = USER_TYPES.deliveryAgent+'Id';
        break;
    }

    const document = await model.findOne({
      [key]: req.params.id
    });

    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const gfs = req.gfs;
    if (!gfs) {
      return res.status(500).json({ error: 'gfs is not defined' });
    }

    if (!document.image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    gfs.openDownloadStream(new mongoose.Types.ObjectId(document.image))
      .pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

// this api will set the isActive value to false
exports.delete = async(req, res) => {
  try{
    let Model;
    let key;
    // setting the model
    switch (req.params.type) {
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
    console.log(err);
    res.status(400).json({message: "Something went wrong"});
  }
};

// This api can you used to change the password of a user
exports.changePassword = async(req,res) => {
  try {
    let Model;
    let key;
    // setting the Model and key
    switch (req.body.type) {
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
    res.status(400).json(err.message);
  }
};