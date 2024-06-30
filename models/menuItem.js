const mongoose = require('mongoose');
const { CUISINE_TYPES } = require('../utilities/constants');

const menuItemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: true,
        immutable: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurantId: {
        type: String,
        required: true,
    },
    isVeg: {
        type: Boolean,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(CUISINE_TYPES),
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    mainIngredients: {
        type: Array,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'uploads.files'
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema, 'menu_items')

module.exports = {
    MenuItem,
}