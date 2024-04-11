import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
	"Favorite",
	mongoose.Schema({
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Display name is required."],
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
		mediaRate: {
			type: Number,
			required: [true, "Media rate is required."],
		},
	}, modelOptions)
);