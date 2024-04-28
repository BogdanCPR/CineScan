import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/review.model.js";
import userModel from "../models/user.model.js";

const getUsers = async (req, res) => {
	try {
		const users = await userModel.find().select("_id username displayName accessLevel");
		responseHandler.ok(res, users);
  	} catch {
		responseHandler.error(res);
  	}
}

const getReviews = async (req, res) => {
	try {
		const { userId } = req.params;
		const reviews = await reviewModel.find({
		  user: userId
		}).sort("-createdAt");
	
		responseHandler.ok(res, reviews);
	  } catch {
		responseHandler.error(res);
	  }
}

const updateUserAccessLevel = async (req, res) => {
	try {
		const { username } = req.params;
		const { accessLevel } = req.body;
		await userModel.findOneAndUpdate({ username }, { accessLevel });
		responseHandler.ok(res);
	}
	catch {
		responseHandler.error(res);
	}
}

export default {
	getUsers,
	getReviews,
	updateUserAccessLevel
}