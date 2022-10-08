const {Contact} = require("../../models/contact");


const addContact = async (req, res) => {  
  // забирает значение _id из req.user и переименовывает его в owner
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner });
  res.status(201).json(result);  
}


  module.exports = addContact;