// регистрирует нового пользователя

const { User } = require('../../models/user');
const { RequestError, sendEmailWithSendGrid } = require('../../helpers');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const nanoid = require("nanoid");
const { BASE_URL } = process.env;


const register = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    // проверяет наличие уже зарегистрированного пользователя с такими данніми в базе данных
    if (user) {
        throw RequestError(409, "Email in use");
    }
    // хэширует пароль (второй параметр - 10 "крупинок соли" - дополнительные символы для шифрования)
    const hashPassword = await bcrypt.hash(password, 10);
    // генерирует аватар новому пользователю
    const avatarURL = gravatar.url(email);
    // создает токен верификации для его дальнейшей записи в объект пользователя в базе данных
    const verificationToken = nanoid();
    // создает нового пользователя
    const result = await User.create({ password: hashPassword, email, avatarURL, verificationToken });
    // создает письмо в виде объекта, которое будет отправлено на почту регистрирующемуся пользователю
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a target="_blank" href=${BASE_URL}users/verify/${verificationToken}>Нажмите для подтверждения</a>`
    }
    // отправляет пользователю на почту письмо для верификации(подтверждения) токена
    await sendEmailWithSendGrid(mail);

    

    // возвращает на фронтэнд
    res.status(201).json({
        user:{ 
        email: result.email,
        subscription: result.subscription,
        verificationToken: result.verificationToken,
     }
    });
}


module.exports = register;