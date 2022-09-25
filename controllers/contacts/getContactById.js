const contacts = require("../../models/contacts");
const {RequestError} = require("../../helpers");


const getContactById = async (req, res) => {    
  const id = req.params.contactId;
  const result = await contacts.getContactById(id);
  // проверка на отсутсвие элемента с нужным id
  if (!result){ 
    // создание ошибки и прокидывание её далее
    throw RequestError(404, "Not found");
    }
  res.status(200).json(result);
}


module.exports = getContactById;      