const getListContacts = require("./getListContacts");
const getContactById = require('./getContactById');
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");


module.exports = {
    getListContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
}