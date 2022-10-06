const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const contactsRouter = require('./routes/api/contacts');
const usersRouter = require('./routes/api/users');
require("dotenv").config();


const app = express();

// формат сообщений о запросах (от morgan) - короткий или длинный
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

// отображает информацию в консоли
app.use(logger(formatsLogger));
app.use(cors());
// преобразует json-формат тела запроса - в объект
app.use(express.json());

// при запросе на '/api/contacts' его обработчик нужно искать в contactsRouter
app.use('/api/contacts', contactsRouter);
// при запросе на '/api/users' его обработчик нужно искать в usersRouter
app.use('/api/users', usersRouter);

// обработчик ситуаций при запросе на несуществующую страницу 
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})


app.use((err, req, res, next) => {
  // значения по умолчанию. сработают только если у ошибки ещё нет значений данных параметров
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  });
})


module.exports = app;