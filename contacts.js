const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(buffer)
  return contactsList;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(({ id }) => id === contactId);
  return contactById || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactById = await getContactById(contactId);
  const removeContact = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(removeContact, null, 2));
  return contactById;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = uuid.v4();
  const newContacts = {id, name, email, phone};
  const updatedList = [...contacts, newContacts];
  await fs.writeFile(contactsPath, JSON.stringify(updatedList, null, 2));
  return newContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
