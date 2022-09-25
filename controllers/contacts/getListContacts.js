const contacts = require("../../models/contacts");

const getListContacts = async (_, res) => {
    const result = await contacts.getListContacts();
    res.status(200).json(result);       
  }

  
  module.exports = getListContacts;