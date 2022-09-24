const contacts = require("../../models/contacts");
const {RequestError} = require("../../helpers");


const updateContact = async (req, res) => { 
  const id = req.params.contactId;
  const result = await contacts.updateContact(id, req.body);
  if (!result){      
    // создание ошибки и прокидывание её далее
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);    
}


  module.exports = updateContact;