const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {ctrlWrapper} = require("../../helpers");
const {validateBody, validateFavorite, isValidId} = require("../../middlewares");
const {schemas} = require("../../models/contact");


router.get('/', ctrlWrapper(ctrl.getListContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', isValidId, validateFavorite(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));


module.exports = router;