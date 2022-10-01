const {isValidObjectId} = require("mongoose");
const {RequestError} = require("../helpers");


// проверяет валидность введенного id
const isValidId = (req, res, next) =>{
    const id = req.params.contactId;
    console.log("id", id);
    const result = isValidObjectId(id);
    if (!result){
        next(RequestError(404, `${id} is not a valid id.`));
    }
    next();
}


module.exports = isValidId;