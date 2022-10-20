// получает данные текущего пользователя

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    
    // возвращает на фронтэнд
    res.json({
        email,
        subscription,
    })    
}


module.exports = getCurrent;