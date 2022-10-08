const {Contact} = require("../../models/contact");


const getListContacts = async (req, res) => {
  // пагинация
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;
  // забирает значение _id из req.user и переименовывает его в owner  
  const { _id: owner } = req.user;
  // находит только созданные текущим пользователем данные. фильтрация происходит по параметру owner и любому параметру из ...query
  const result = await Contact.find({ owner , ...query}, "", {skip, limit});
  res.status(200).json(result);       
  }

    
  module.exports = getListContacts;