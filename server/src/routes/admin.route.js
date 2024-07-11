import express from "express";
import adminController from "../controllers/admin.controller.js";
import tokenMiddleware from "../middlewares/token.middleware.js";


const router = express.Router();

router.get(
	"/users",
	adminController.getUsers
)

router.get(
	"/accessLevel",
	tokenMiddleware.auth,
	adminController.getUserAccessLevel
)

router.get(
	"/reviews/:userId",
	adminController.getReviews
)

router.put(
	"/users/:username",
	adminController.updateUserAccessLevel
)

router.delete(
	"/users/:username",
	adminController.removeUser
)

router.delete(
	"/reviews/:reviewId",
	adminController.removeReview
)

export default router;