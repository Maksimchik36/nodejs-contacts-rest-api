// проверяет наличие и правильность типа вводимых значений, согласно схемы, которую принимает 

const { RequestError } = require("../helpers");


const validateBody = (schema) => {
      const func = (req, res, next) => {
      const {error} = schema.validate(req.body)
      if(error){
        // передача ошибки в ф-ю с четырьмя параметрами - app.use((err, req, res, next)
        next(RequestError(400, "Missing required name field."))
      }
      // запуск поиска express-ом обработчика ошибок. ищет ф-ю с четырьмя параметрами - app.use((err, req, res, next)
      next();
    }
    
    return func;
}


module.exports = validateBody;