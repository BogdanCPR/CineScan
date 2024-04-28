import express from "express";
import adminController from "../controllers/admin.controller.js";


const router = express.Router();

router.get(
	"/users",
	adminController.getUsers
)

router.get(
	"/reviews/:userId",
	adminController.getReviews
)

router.put(
	"/users/:username",
	adminController.updateUserAccessLevel
)

export default router;