const yup = require('yup');
const { USER_TYPES } = require('../../utilities/constants');

const allOrdersSchema = yup.object().shape({
    userId: yup.string().required('User id is required'),
    userType: yup.string().required('User type is required').oneOf(Object.values(USER_TYPES)),
});

module.exports = allOrdersSchema;