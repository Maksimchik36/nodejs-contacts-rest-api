const { Schema, model } = require("mongoose");
const Joi = require('joi');
const { handleSaveErrors } = require("../middlewares");


// создает схему для валидации элементов при записи в коллекцию
const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},
{versionKey: false});


// создает модель Contact, вызывая ф-ю model("название коллекции, с которой будет работать", схема, по которой будет осуществляться валидация )
const Contact = model("contact", contactSchema);


contactSchema.post("save", handleSaveErrors);

// создает схему для валидации body при запросе
const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
})
  
// объект со всевозможными схемами для валидации body при запросе
const schemas = {
    addSchema,
}


module.exports = {
    Contact,
    schemas
};