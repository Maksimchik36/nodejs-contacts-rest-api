const {User} = require("../../models/user");


const updateUserSubscription = async (req, res) => { 
  const { _id } = req.user;
  const { subscription } = req.body;

  // перезаписывает значение user subscription на введенное при запросе
  await User.findByIdAndUpdate(_id, { subscription }, {new: true});  // {new:true} - для возврата обновленного объекта. по умолчанию возвращает исходный
 
  res.status(200).json();    
}


  module.exports = updateUserSubscription;