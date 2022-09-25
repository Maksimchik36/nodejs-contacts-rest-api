const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('models/contacts.json');

// записывает allContacts в contacts.json (создана в результате рефакторинга, используется при изменении массива для обновления и на бэкэнде)
const updateAllContacts = async (allContacts) => await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));


const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
}


const getContactById = async (contactId) => {
  const id = contactId.toString();
    const allContacts = await getListContacts();
    const contactById = allContacts.find(contact => contact.id === id);
    return contactById || null;
}


const removeContact = async (contactId) => {
  const id = contactId.toString();
    const allContacts = await getListContacts();
    // вычисляет index указанного элемента в массиве
    const index = allContacts.findIndex(contact => contact.id === id);
    if(index === -1){
        return null;
    }
    // в результате деструктуризации получаем объект, а не массив.удаляет элемент из массива и возвращает удаляемый элемент (splice)
    const [result] = allContacts.splice(index, 1);
    await updateAllContacts(allContacts);
    return result;
}


const addContact = async (body) => {
  const {name, email, phone} = body;
  const allContacts = await getListContacts();
    const id = nanoid();
    const newContact = {
        id,
        name,
        email,
        phone
    }
    allContacts.push(newContact);
    await updateAllContacts(allContacts);
    return newContact;
}


const updateContact = async (contactId, {name, email, phone}) => {
  const allContacts = await getListContacts();
  const id = contactId.toString();
    const index = allContacts.findIndex(contact => contact.id === id);
    if(index === -1) {
        return null;
    }
    allContacts[index] = {id, name, email, phone};
    await updateAllContacts(allContacts);
    return allContacts[index];
}


module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}