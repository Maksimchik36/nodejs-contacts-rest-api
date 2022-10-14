// создает функцию, на основе которой в дальнейшем осуществляется передача файлов 
// создаёт настройки для временного хранения файлов при исп - нии multer

const multer = require('multer'); 
const path = require('path');

// инициализирует папку для временного хранилища файлов
const tmpDir = path.join(__dirname, '..', 'tmp');

// создаёт настройки для multer
const multerConfig = multer.diskStorage({
    destination: tmpDir,
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// загружает настройки для multer
const upload = multer({
    storage: multerConfig,
})


module.exports = upload;