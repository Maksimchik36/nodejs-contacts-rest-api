// изменяет аватар пользователя

const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../models/user');
const avatarDir = path.join(__dirname, '..', '..', 'public', 'avatars');
const Jimp = require('jimp');


const updateAvatar = async (req, res) => {
    try {
        const { _id } = req.user;
        // при деструктуризации переименовывает path в tmpUpload - это локальный абсолютный путь временного хранилища файла, включая имя этого файла
        const { path: tmpUpload, originalname } = req.file;  

        // присваивает необходимому файлу имя image для дальнейших преобразований при помощи пакета jimp 
        const image = await Jimp.read(tmpUpload);
        // изменяет размер картинки
        image.resize(250, 250);
        // сохраняет изменения
        image.write(tmpUpload);

        // создает уникальное имя файла из id и originalname
        const filename = path.join(`${_id}-${originalname}`);
        // создает локальный абсолютный путь постоянного хранилища файла, включая новое имя этого файла
        const resultUpload = path.join(avatarDir, filename);
        // перемещает файл из временного хранилища tmpUpload в постоянное resultUpload
        await fs.rename(tmpUpload, resultUpload);
        // создает относительный путь расположения файла относительно папки, которая указана в app.js в функции app.use(express.static('public')), в данном случае это public
        const avatarURL = path.join('avatars', filename);
        // изменяет в базе данных в объекте текущего пользователя относительный путь к файлу
        await User.findByIdAndUpdate(_id, { avatarURL });

        // возвращает на фронтэнд
        res.json({ avatarURL });        
    } catch (error) {
        // удаляет файл из временного хранилища
        await fs.unlink(req.file.path);
        throw Error;        
    }
}


module.exports = updateAvatar;