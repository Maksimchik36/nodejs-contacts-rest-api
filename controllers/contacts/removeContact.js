// удаляет контакт

const { Contact } = require('../../models/contact');
const { RequestError } = require("../../helpers");


const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result){ 
    // создание ошибки и прокидывание её далее
    throw RequestError(404, "Not found");
  }

  // возвращает на фронтэнд
  res.status(200).json({message: "Contact deleted"});   
}


  module.exports = removeContact;