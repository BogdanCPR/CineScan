import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
	"Contact",
	mongoose.Schema({
		name: {
			type: String,
			required: [true, "Name is required."],
		},
		email: {
			type: String,
			required: [true, "Email is required."],
		},
		subject: {
			type: String,
			required: [true, "Subject is required."],
		},
		message: {
			type: String,
			required: [true, "Message is required."],
		},
	}, modelOptions)
);