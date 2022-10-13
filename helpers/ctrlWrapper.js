// срабатываает при появлении ошибок в контроллерах

// в результате рефакторинга вынесли try-catch в отдельную обертку, которая будет оборачивать контроллеры (для проверки)
const ctrlWrapper = (ctrl) => {
    const func = async(req, res, next) => {
        try {
            await ctrl(req, res, next);            
        } catch (error) {
            // запуск поиска express-ом обработчика ошибок. ищет ф-ю с четырьмя параметрами - app.use((err, req, res, next)
            next(error);
        }
    } 
    return func;
}


module.exports = ctrlWrapper;