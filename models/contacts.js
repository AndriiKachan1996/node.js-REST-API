const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
	try {
		const data = await fs.readFile(contactsPath);
		const contacts = JSON.parse(data);
		return contacts;
	} catch (error) {
		return [];
	}
}

async function getContactById(contactId) {
	try {
		const contacts = await listContacts();
		const contact = contacts.find((contact) => contact.id === contactId);
		return contact || null;
	} catch (error) {
		return null;
	}
}

async function removeContact(contactId) {
	try {
		const contacts = await listContacts();
		const updatedContacts = contacts.filter(
			(contact) => contact.id !== contactId
		);
		await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
		return true;
	} catch (error) {
		return false;
	}
}

async function addContact(contactData) {
	try {
		const contacts = await listContacts();
		const newContact = { id: nanoid(), ...contactData };
		contacts.push(newContact);
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return newContact;
	} catch (error) {
		return null;
	}
}

async function updateContact(contactId, updatedData) {
	try {
		const contacts = await listContacts();
		const contactIndex = contacts.findIndex(
			(contact) => contact.id === contactId
		);
		if (contactIndex === -1) {
			return null;
		}
		const updatedContact = { ...contacts[contactIndex], ...updatedData };
		contacts[contactIndex] = updatedContact;
		await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
		return updatedContact;
	} catch (error) {
		return null;
	}
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
