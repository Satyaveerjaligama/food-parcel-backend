const yup = require('yup');

const changePassword = yup.object().shape({
    userId: yup.string().required('User id is required'),
    type: yup.string().required('Type is required'),
    oldPassword: yup.string().required('Old password is required').min(6, 'Old password should be minimum 6 characters'),
    newPassword: yup.string().required('New password is required').min(6, 'New password should be minimum 6 characters'),
});

module.exports = changePassword;