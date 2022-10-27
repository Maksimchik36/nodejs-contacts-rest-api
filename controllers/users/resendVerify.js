// повторно отправляет письмо с верификацией

const { RequestError, sendEmailWithSendGrid, createVerifyEmail } = require("../../helpers");
const { User } = require("../../models/user");


const resendVerify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw RequestError(400, "Email not found." )
    }
    if (user.verify) {
        throw RequestError(400, "Verification has already been passed.");
    }
    // создает письмо в виде объекта, которое будет отправлено на почту регистрирующемуся пользователю
    const mail = createVerifyEmail(email, user.verificationToken);
    // // отправляет пользователю на почту письмо для верификации(подтверждения) токена
    await sendEmailWithSendGrid(mail);
   
    // отправляет на фронтэнд
    res.json({
        message: 'Verification email sent.'
    })        
}


module.exports = resendVerify;