"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const portfolioRoutes_1 = __importDefault(require("./routes/portfolioRoutes"));
dotenv_1.default.config();
console.log("Hello World!");
const PORT = process.env.PORT || 3000;
const URI = process.env.URI || "mongodb://localhost:27017/portfolio";
mongoose_1.default.connect(URI).then(() => {
    console.log("MongoDB Connected");
}).catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
app.use("/portfolio", portfolioRoutes_1.default);
