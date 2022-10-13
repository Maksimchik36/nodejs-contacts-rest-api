// регистрирует нового пользователя

const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');


const register = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw RequestError(409, "Email in use");
    }
    // хэширует пароль (второй параметр - 10 "крупинок соли" - дополнительные символы для шифрования)
    const hashPassword = await bcrypt.hash(password, 10);
    // генерирует аватар новому пользователю
    const avatarURL = gravatar.url(email);
    // создает нового пользователя
    const result = await User.create({ password: hashPassword, email, avatarURL });

    // возвращает на фронтэнд
    res.status(201).json({
        user:{ 
        email: result.email,
        subscription: result.subscription
     }
    });
}


module.exports = register;