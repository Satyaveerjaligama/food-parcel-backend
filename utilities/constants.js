const RESPONSE_MESSAGES = {
    detailsNotFound: 'Details not found',
    registrationSuccess: 'Registration Successful',
    userIsInactive: 'Sorry, User is inactive'
}

const MONGO_URI = 'mongodb://127.0.0.1:27017/food_delivery_app';

const USER_TYPES = {
    customer: 'customer',
    restaurant: 'restaurant',
    deliveryAgent: 'deliveryAgent'
};

const CUISINE_TYPES = {
    indian: 'Indian',
    chinese: 'Chinese',
    continental: 'Continental',
    american: 'American',
    italian: 'Italian',
    japanese: 'Japanese',
};

const ORDER_STATUS = {
    processing: 'Processing',
    accepted: 'Accepted',
    rejected: 'Rejected',
    reachedPickupLocation: 'Reached Pick-up location',
    onTheWay: 'On the way',
    delivered: 'Delivered',
}

module.exports={
    RESPONSE_MESSAGES,
    MONGO_URI,
    USER_TYPES,
    CUISINE_TYPES,
    ORDER_STATUS,
}