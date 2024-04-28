import privateClient from '../client/private.client'


const adminEndpoints = {
	users:"admin/users",
	reviews:"admin/reviews"
}

const adminApi = {
	getUsers: async () => {
		try {
			const response = await privateClient.get(
				adminEndpoints.users
			)
			console.log(response);
			return { response };
		} catch (err) {
			return { err };
		}
	},
	getReviews: async (userId) => {
		try {
		  const response = await privateClient.get(
			`${adminEndpoints.reviews}/${userId}`
		  )
		  return { response };
		} catch (err) {
		  return { err };
		}
	  },
	updateUserAccessLevel: async (username, accessLevel) => {
		try {
			const response = await privateClient.put(
				`${adminEndpoints.users}/${username}`,
				{ accessLevel }
			)
			return { response };
		} catch (err) {
			return { err };
		}
	}
}

export default adminApi;
