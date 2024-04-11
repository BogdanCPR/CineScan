import jsonwebtoken from 'jsonwebtoken';
import responseHandler from '../handlers/response.handler.js';
import userModel from '../models/user.model.js';

const tokenDecode = (req) => {
	try{
		const bearerHandler = req.headers["authorization"];

		if (bearerHandler) {
			const token = bearerHandler.split(" ")[1];
			const decoded = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
			return decoded;
		}

		return false;
	} catch {
		return false;
	}
};

const auth = async (req, res, next) => {
	const tokenDecoded = tokenDecode(req);

	if (!tokenDecoded) {
		return responseHandler.unauthorized(res);
	}

	const user = await userModel.findById(tokenDecoded.data);
	if (!user) {
		return responseHandler.unauthorized(res);
	}

	req.user = user;
	next();
}

export default {auth, tokenDecode};