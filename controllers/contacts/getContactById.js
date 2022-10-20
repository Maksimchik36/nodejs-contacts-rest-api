// получает контакт по id

const { Contact } = require("../../models/contact");
const {RequestError} = require("../../helpers");


const getContactById = async (req, res) => {    
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  // проверка на отсутсвие элемента с нужным id
  if (!result){ 
    // создание ошибки и прокидывание её далее
    throw RequestError(404, "Not found");
  }
  
  // возвращает на фронтэнд
  res.status(200).json(result);
}


module.exports = getContactById;      