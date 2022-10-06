const {Contact} = require("../../models/contact");


const getListContacts = async (req, res) => {
  // забирает значение _id из req.user и переименовывает его в owner  
  const { _id: owner } = req.user;
  // находит только созданные текущим пользователем данные
  const result = await Contact.find({ owner });
  res.status(200).json(result);       
  }

    
  module.exports = getListContacts;