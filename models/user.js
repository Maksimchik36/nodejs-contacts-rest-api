const { Schema, model } = require("mongoose");
const Joi = require('joi');
const { handleSaveErrors } = require("../helpers");


// создает схему для валидации элементов при записи в коллекцию
const userSchema = new Schema(
  {
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
},
{versionKey: false}
);


// срабатывает в случае ошибки при операции POST(при попытке добавить ещё один элемент с уже существующим таким уникальным полем)
userSchema.post("save", handleSaveErrors);


// создает модель User, вызывая ф-ю model("название коллекции, с которой будет работать", схема, по которой будет осуществляться валидация )
const User = model("user", userSchema);


// создает схему для валидации body при запросе с помощью Joi
const signUpAndLoginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
});

// создает схему для валидации почты при повторном отправлении письма для верификации с помощью Joi
const verifyEmailSchema = Joi.object({
  email: Joi.string().required(),
})


// создает схему для валидации поля subsctiption при update с помощью Joi
const updateSubscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});


// объект со всевозможными схемами для валидации body при запросе
const schemas = {
  signUpAndLoginSchema,
  updateSubscriptionSchema,
  verifyEmailSchema
}


module.exports = {
  User,
  schemas,
}