const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const ctrl = require('../../controllers/users');
const router = express.Router();
const { validateBody, authenticate, validateSubscription, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');


router.post('/signup', validateBody(schemas.signUpAndLoginSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));

router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));

router.post('/login', validateBody(schemas.signUpAndLoginSchema), ctrlWrapper(ctrl.login));

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout));

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch('/', authenticate, validateSubscription(schemas.updateSubscriptionSchema), ctrlWrapper(ctrl.updateUserSubscription));

// "avatar" в upload - "key" в postman - параметр объекта, в который добавляется файл, как значение этого параметра
router.patch('/avatars', authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;