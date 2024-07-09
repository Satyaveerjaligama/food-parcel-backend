const yup = require('yup');

const ordersInfoSchema = yup.object().shape({
    userId: yup.string().required('User id is required'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode should be 6 digits'),
});

module.exports = ordersInfoSchema;