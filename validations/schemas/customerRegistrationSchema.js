const yup = require('yup');

const customerRegistrationSchema = yup.object().shape({
    fullName: yup.string().required('Full name is required'),
    emailId: yup.string().required('Email id is required').email('Invalid Email id'),
    phoneNumber: yup.string().required('Phone number is required').matches(/^[6-9][0-9]{9}$/, 'Enter valid phone number'),
    address: yup.string().required('Address is required'),
    pincode: yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode should be 6 digits'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
});

module.exports = customerRegistrationSchema;