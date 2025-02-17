// осуществляет валидацию id согласно mongoose

const { isValidObjectId } = require("mongoose");
const {RequestError} = require("../helpers");

// проверяет валидность введенного id
const isValidId = (req, res, next) =>{
    const id = req.params.contactId;
    const result = isValidObjectId(id);
    if (!result){
        next(RequestError(404, `${id} is not a valid id.`));
    }
    next();
}


module.exports = isValidId;