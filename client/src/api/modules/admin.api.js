import privateClient from '../client/private.client'


const adminEndpoints = {
	users:"admin/users",
	reviews:"admin/reviews",
	accessLevel:"admin/accessLevel"
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
	removeReview: async (reviewId) => {
		try {
			console.log("REVIEW ID", reviewId);
			const response = await privateClient.delete(
				`${adminEndpoints.reviews}/${reviewId}`
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
	},
	getUserAccessLevel: async () => {
		try {
			const response = await privateClient.get(
				adminEndpoints.accessLevel
			)
			return { response };
		} catch (err) {
			return { err };
		}
	},
	removeUser: async (username) => {
		try {
			const response = await privateClient.delete(
				`${adminEndpoints.users}/${username}`
			)
			return { response };
		} catch (err) {
			return { err };
		}
	}
}

export default adminApi;
