// проверяет наличие и правильность типа вводимых значений параметра subscription, согласно схемы, которую принимает 

const { RequestError } = require("../helpers");


// проверка на правильный тип вводимых значений
const validateSubscription = (schema) => {
      const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
      if(error){
        // передача ошибки в ф-ю с четырьмя параметрами в app.js - app.use((err, req, res, next)
        next(RequestError(400, "Missing field subscription."))
      }
      // запуск поиска express-ом обработчика ошибок. ищет ф-ю с четырьмя параметрами - app.use((err, req, res, next)
      next();
    }
    
    return func;
}


module.exports = validateSubscription;