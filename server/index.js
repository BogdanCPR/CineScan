import express from "express"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"
import routes from "./src/routes/index.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then
(() => {
	console.log("connected to database")
	server.listen(port, () => {
		console.log(`server is running on port ${port}`);
	})
}).catch((err) => {
	console.log({err});
	process.exit(1);
})