const {User} = require('../../models/user');
const {RequestError} = require('../../helpers');


const register = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    const result = await User.create({ password, email });
    res.status(201).json({
        user:{ 
        email: result.email,
        subscription: result.subscription
     }
    });
}


module.exports = register;