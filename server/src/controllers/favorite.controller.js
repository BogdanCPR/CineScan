import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";


const addFavorite = async (req, res) => {
	try {
		const isFavorite = await favoriteModel.findOne({
			user: req.user._id,
			mediaId: req.body.mediaId,
		})

		if (isFavorite) {
			return responseHandler.ok(res, isFavorite);
		}

		const favorite = new favoriteModel({
			...req.body,
			user: req.user._id
		});

		await favorite.save();

		responseHandler.created(res, favorite);
	} catch {
		responseHandler.error(res);
	}
}

const removeFavorite = async (req, res) => {
	try {
	  const { favoriteId } = req.params;
  
	  const result = await favoriteModel.deleteOne({
		user: req.user.id,
		_id: favoriteId
	  });
  
	  if (result.n === 0) return responseHandler.notfound(res);
    
	  responseHandler.ok(res);
	} catch {
	  responseHandler.error(res);
	}
  };

const getFavoritesOfUser = async (req, res) => {
	try {
		const favorite = await favoriteModel.find({
			user: req.user._id
		}).sort("-createdAt");

		responseHandler.ok(res, favorite);
	} catch  {
		responseHandler.error(res);
	}
}

export default {
	addFavorite,
	removeFavorite,
	getFavoritesOfUser
}
