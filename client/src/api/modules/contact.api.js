import privateClient from '../client/private.client'

const contactEndpoint = {
	contact:"contact/save",
	getContacts:"contact/get",
	removeContact:"contact/remove/:id"
}

const contactApi = {
	saveForm: async (name, email, subject, message) => {
		console.log(name, email, subject, message, "contactApi.saveForm");
		try {
			const response = await privateClient.post(
				contactEndpoint.contact,
				{
					name,
					email,
					subject,
					message
				}
			)
			return { response };
		} catch (err) {
			return { err };
		}
	},
	getContacts: async () => {
		try {
			const response = await privateClient.get(
				contactEndpoint.getContacts
			)
			console.log(response, "contactApi.getContacts");
			return { response };
		} catch (err) {
			return { err };
		}
	},
	removeContact: async (id) => {
		try {
			const response = await privateClient.delete(
				contactEndpoint.removeContact.replace(":id", id.contactId)
			)
			return { response };
		} catch (err) {
			return { err };
		}
	}
}

export default contactApi;