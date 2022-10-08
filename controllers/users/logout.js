const { User } = require('../../models/user');


const logout = async (req, res) => {
    const { _id } = req.user;
    // перезаписывает значение token на null
    await User.findByIdAndUpdate(_id, {token: null})

    res.status(204).send("No Content")
}


module.exports = logout;