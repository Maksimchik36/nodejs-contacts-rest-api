const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/users');
const router = express.Router();
const { validateBody, authenticate, validateSubscription } = require('../../middlewares');
const { schemas } = require('../../models/user');


router.post('/signup', validateBody(schemas.signUpAndLoginSchema), ctrlWrapper(ctrl.register));

router.post('/login', validateBody(schemas.signUpAndLoginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authenticate, validateSubscription(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateUserSubscription));


module.exports = router;