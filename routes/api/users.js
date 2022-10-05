const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/users');
const router = express.Router();
const { validateBody } = require('../../middlewares');
const { schemas } = require('../../models/user');


router.post('/signup', validateBody(schemas.signUpAndLoginSchema), ctrlWrapper(ctrl.register));


module.exports = router;