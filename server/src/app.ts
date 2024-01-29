import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import route from "./routes/portfolioRoutes";
dotenv.config();

console.log("Hello World!"); 

const PORT= process.env.PORT || 3000;
const URI= process.env.URI || "mongodb://localhost:27017/portfolio";

mongoose.connect(URI).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});

app.use("/portfolio", route);
