// проверяет залогинен ли пользователь

require("dotenv").config();
const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

// проверяет наличие прав у данного пользователя на работу с информацией. и при положительном ответе добавляет данные пользователя в req.user
const authenticate = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer = "", token = ""] = authorization.split(" ");
        if (bearer !== "Bearer") {
        throw RequestError(401, "Not authorized");        
        }
        try {
            // проверяет валидность токена
            const { id } = jwt.verify(token, SECRET_KEY);
            // ищет пользователя с полученным id 
            const user = await User.findById(id);
            //проверяет отсутствие пользователя или отсутствие у него токена
            if (!user || !user.token) {
                 throw RequestError(401, "Not authorized");
            }
            // сохраняет все данные по текущему юзеру в объект запроса req. данные будут доступны при любом запросе
            req.user = user;
            // переходит к следующей функции в роуте
            next();
            
        } catch (error) {
            throw RequestError(401, "Not authorized");             
        }
    } catch (error) {
        next(error);        
    }    
}


module.exports = authenticate;