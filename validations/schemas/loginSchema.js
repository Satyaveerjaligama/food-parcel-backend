const yup = require('yup');
const { USER_TYPES } = require('../../utilities/constants');

const loginSchema = yup.object().shape({
    emailId: yup.string().required('Email id is required').email('Provide a valid Email id'),
    password: yup.string().required('Password is required'),
    userType: yup.string().required('User type is required').oneOf(Object.values(USER_TYPES))
});

module.exports = loginSchema;