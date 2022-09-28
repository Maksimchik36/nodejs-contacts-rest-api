const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require("mongoose");

// создание переменной адреса для дальнейшего подключения с помощью mongoose -  "mongodb+srv://<login>:<password>@cluster0.lh0mpjn.mongodb.net/<database-name>?retryWrites=true&w=majority"
const DB_HOST = "mongodb+srv://Maksim:BdRIDdBxrRd2hC8T@cluster0.lh0mpjn.mongodb.net/db-contacts?retryWrites=true&w=majority"
mongoose.connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const contactsRouter = require('./routes/api/contacts');

const app = express();

// формат сообщений о запросах (от morgan) - короткий или длинный
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
// преобразует json-формат тела запроса - в объект
app.use(express.json());

// при запросе на '/api/contacts' его обработчик нужно искать в contactsRouter
app.use('/api/contacts', contactsRouter);

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