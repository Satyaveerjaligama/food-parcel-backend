const yup = require('yup');

const addMenuItem = yup.object().shape({
    name: yup.string("Name should be string").required("Name is required"),
    price: yup.number().required('Price is required'),
    restaurantId: yup.string().required('Restaurant Id is required'),
    isVeg: yup.boolean().required('isVeg is required'),
    isAvailable: yup.boolean().required('isAvailable is required'),
    type: yup.string("Type should be string").required("Type is required"),
    category: yup.string("Category should be string").required("Category is required"),
    mainIngredients: yup.array().of(yup.string()).required('Main ingredients are required'),
})

module.exports = addMenuItem;