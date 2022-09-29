// при попытке повторно добавить элемент с уже существующим таким уникальным полем - присваивает ошибке status = 409, в остальных случае - 400
const handleSaveErrors = (error, data, next) => {
    const { name, code } = error;
    error.status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    next();
}
  

module.exports = handleSaveErrors;