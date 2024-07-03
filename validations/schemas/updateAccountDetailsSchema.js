const yup = require('yup');

const updateAccountDetailsSchema = yup.object().shape({
    userId: yup.string().required('User id is required'),
    type: yup.string().required('Type is required'),
    name: yup.string().required('Name is required'),
    emailId: yup.string().required('Email id is required').email('Invalid email id'),
    phoneNumber: yup.string().required('Phone number is required').matches(/^[6-9][0-9]{9}$/, 'Enter valid phone number'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode should have exactly 6 digits'),
});

module.exports = updateAccountDetailsSchema;