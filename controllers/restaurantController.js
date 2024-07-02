const { Restaurant } = require("../models/restaurant");
const { RESPONSE_MESSAGES } = require("../utilities/constants");
const { generateUserId } = require("../utilities/utilityFunctions");
const { Types } = require("mongoose");
const { MenuItem } = require("../models/menuItem");

exports.register = async (req, res) => {
  try {
    let userId = generateUserId("restaurant");
    let restaurant = await Restaurant.findOne({ userId });

    while (restaurant) {
      userId = generateUserId("restaurant");
      restaurant = await Restaurant.findOne({ userId });
    }

    const newRestaurant = new Restaurant({ ...req.body, restaurantId: userId });
    await newRestaurant.save();
    res.status(201).send(`Restaurant ${RESPONSE_MESSAGES.registrationSuccess}`);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

// This API will fetch all restaurants based on the pincode that we provide
exports.fetchRestaurants = async (req, res) => {
  const pincode = req.params?.pincode;
  try {

    // get the list of restaurants that match with the pincode
    const restaurants = await Restaurant.find(
      { pincode },
      {
        restaurantId: 1,
        restaurantName: 1,
        restaurantType: 1,
        image: 1,
        _id: 0,
      }
    );

    // Fetch the image using imageId and convert to base 64
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

    const promises = restaurants.map(async (restaurant) => {
      let base64Image;
      // if a restaurant has an image, then we try to get and convert to base 64 using downloadImage function
      if (restaurant.image) {
        const imageId = new Types.ObjectId(restaurant.image);
        const gfs = req.gfs;
        base64Image = await downloadImage(gfs, imageId);
      }

      response.push({
        restaurantId: restaurant.restaurantId,
        restaurantName: restaurant.restaurantName,
        restaurantType: restaurant.restaurantType,
        image: base64Image ? base64Image : "",
      });
    });

    const response = [];
    await Promise.all(promises);
    
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// This api will fetch the restaurant details based on the restaurant id
exports.fetchRestaurantDetails = async(req, res) => {
    const restaurantId = req.params?.restaurantId;
    try {
        const restaurants = await Restaurant.find({restaurantId},{restaurantId: 1, restaurantName: 1, restaurantType: 1, _id: 0});
        res.status(200).json(restaurants[0]);
    } catch(err) {
        res.status(400).json({message: err.message})
    }
}

// This api will add a menu item
exports.addMenuItem = async(req,res) => {
  try{
    // check the restaurant before adding the menu item
    const restaurantId = req.body.restaurantId;
    let restaurant = await Restaurant.findOne({restaurantId});
    if(!restaurant) {
      res.status(404).json({message: 'Unable to find the restaurant to add the menu item'});
      return;
    }

    // generate a unique item id
    let itemId = generateUserId('menuItem');
    let existingMenuItem = await MenuItem.findOne({itemId});

    while(existingMenuItem) {
      itemId = generateUserId('menuItem');
      existingMenuItem = await MenuItem.findOne({itemId});
    }

    // create and save document in the table
    const menuItem = new MenuItem({...req.body, itemId})
    await menuItem.save();

    const addedItem = {
      itemId,
      name: menuItem.name
    };

    // fetching updated menu items list
    const allMenuItems = await MenuItem.find({restaurantId}, {_id: 0, __v: 0});

    res.status(201).json({
      addedItem,
      allMenuItems
    });
  } catch(err) {
    res.status(400).send(err.message);
  }
};

// This api will fetch all the menu items based on the restaurant id that is passed in api route
exports.getMenuItems = async(req, res) => {
  try {
    const restaurantId = req.params.restaurantId;
    const menuItems = await MenuItem.find({restaurantId}, {_id: 0, __v: 0})
    
    // if menu items are not available
    if(menuItems.length === 0) {
      res.status(404).json({message: 'Menu items not found'});
      return;
    }

    res.status(200).json(menuItems)
  } catch(err) {
    res.status(400).json({message: "Something went wrong"})
  }
};

// This API will update the data of a menu item
exports.updateMenuItem = async(req,res) => {
  try{
    const itemId = req.params.itemId;
    const reqBody = req.body;
    const restaurantId = reqBody.restaurantId;
    const updatedMenuItem = await MenuItem.updateOne(
      {
        itemId,
        restaurantId
      },
      { $set:
        {
          name: reqBody.name,
          price: reqBody.price,
          isVeg: reqBody.isVeg,
          isAvailable: reqBody.isAvailable,
          type: reqBody.type,
          category: reqBody.category,
          mainIngredients: reqBody.mainIngredients,
        }
      }
    )
    
    if(updatedMenuItem.matchedCount > 0) {
      const menuItems = await MenuItem.find({restaurantId}, {_id: 0, __v: 0})

      res.status(200).json(menuItems)
    } else {
      res.status(404).json({message: 'Menu item not found'})
    }
  } catch(err) {
    res.status(400).json({message: "Something went wrong"})
  }
};

// This api will delete the menu item based on item id and restaurant id
exports.deleteMenuItem = async(req,res) => {
  try {
    const restaurantId = req.body.restaurantId;
    const result = await MenuItem.deleteOne(
      {
        itemId: req.body.itemId,
        restaurantId
      }
    )

    if(result.deletedCount > 0) {
      // Fetching update menu items list
      const allMenuItems = await MenuItem.find({restaurantId}, {_id: 0, __v: 0});
      res.status(200).json(allMenuItems);
    } else {
      res.status(404).json({message: "Menu Item not found"});
    }
  } catch(err) {
    res.status(400).json({message: "Something went wrong"});
  }
};