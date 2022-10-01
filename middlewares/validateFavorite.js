const {RequestError} = require("../helpers");


// проверка на правильный тип вводимых значений
const validateFavorite = (schema) => {
      const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
      if(error){
        // передача ошибки в ф-ю с четырьмя параметрами - app.use((err, req, res, next)
        next(RequestError(400, "Missing field favorite."))
      }
      // запуск поиска express-ом обработчика ошибок. ищет ф-ю с четырьмя параметрами - app.use((err, req, res, next)
      next();
    }
    
    return func;
}


module.exports = validateFavorite;