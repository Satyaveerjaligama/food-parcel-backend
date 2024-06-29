const { Restaurant } = require("../models/restaurant");
const { Customer } = require("../models/customer");
const { DeliveryAgent } = require("../models/deliveryAgent");
const mongoose = require("mongoose");
const { USER_TYPES } = require("../utilities/constants");

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