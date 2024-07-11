import responseHandler from "../handlers/response.handler.js";
import contactModel from "../models/contact.model.js";

const saveForm = async (req, res) => {
	console.log("CREATE CONTACT");
	console.log(req.body);
	try {
		const { name, email, subject, message } = req.body;

		const contact = new contactModel({
		name,
		email,
		subject,
		message
		});

		await contact.save();

		responseHandler.created(res, {
		...contact._doc,
		id: contact.id
		});
  } catch {
	responseHandler.error(res);
  }
}

const getContacts = async (req, res) => {
	try {
		const contacts = await contactModel.find();
		console.log(contacts);
		responseHandler.ok(res, contacts);
	} catch {
		responseHandler.error(res);
	}
}

const removeContact = async (req, res) => {
	try {
		const { id } = req.params;
		await contactModel.findByIdAndDelete(id);
		responseHandler.ok(res);
	} catch {
		responseHandler.error(res);
	}
}

export default {
 	saveForm,
	getContacts,
	removeContact
};