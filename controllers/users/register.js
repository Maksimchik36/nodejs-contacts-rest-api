const {User} = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcrypt');


const register = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    // хэширует пароль (второй параметр - 10 "крупинок соли" - дополнительные символы для шифрования)
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ password: hashPassword, email });
    res.status(201).json({
        user:{ 
        email: result.email,
        subscription: result.subscription
     }
    });
}


module.exports = register;