// изменяет значение поля favorite 

const { Contact } = require("../../models/contact");
const {RequestError} = require("../../helpers");


const updateStatusContact = async (req, res) => { 
  const id = req.params.contactId;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});  // {new:true} - для возврата обновленного объекта. по умолчанию возвращает исходный
  if (!result){      
    // создание ошибки и прокидывание её далее
    throw RequestError(404, "Not found");
  }

  // возвращает на фронтэнд
  res.status(200).json(result);    
}


  module.exports = updateStatusContact;