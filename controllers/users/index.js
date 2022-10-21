const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const getCurrent = require('./getCurrent');
const updateUserSubscription = require('./updateUserSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendVerify = require('./resendVerify');


module.exports = {
    register,
    login,
    logout,
    getCurrent,
    updateUserSubscription,
    updateAvatar,
    verify,
    resendVerify,
}