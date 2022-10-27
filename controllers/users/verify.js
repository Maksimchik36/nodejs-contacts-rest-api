// верифицирует токен

const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");


const verify = async(req, res) => {
    const { verificationToken } = req.params;
    // ищет в базе данных пользователя с данным токеном. если удачно - записывает данные в user, в противном случае - выкидывает ошибку
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw RequestError(404, "User not found");
    }
    // перезаписывает в базе данных значения параметров
    await User.findByIdAndUpdate(user._id, { verificationToken: null, verify: true });
    
    // отправляет на фронтэнд
    res.json({
        message: 'Verification successful.'
    })
}


module.exports = verify;