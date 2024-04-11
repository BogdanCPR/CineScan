import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
	"Review",
	mongoose.Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Display name is required."],
		},
		content: {
			type: String,
			required: [true, "Content is required."],
		},
		mediaType: {
			type: String,
			enum: ["movie", "tv"],
			required: [true, "Media type is required."],
		},
		mediaId: {
			type: String,
			required: [true, "Media id is required."],
		},
		mediaTitle: {
			type: String,
			required: [true, "Media title is required."],
		},
		mediaPoster: {
			type: String,
			required: [true, "Media poster is required."],
		},
	}, modelOptions)
);