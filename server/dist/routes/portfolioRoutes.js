"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageUploader_1 = __importDefault(require("../middleware/imageUploader"));
const portfolioController_1 = require("../controllers/portfolioController");
const route = express_1.default.Router();
route.post("/create", imageUploader_1.default.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'sliderImages', maxCount: 5 }
]), portfolioController_1.createPortfolio);
route.get("/getAll", portfolioController_1.getPortfolios);
route.put("/updateInsert/:id", portfolioController_1.updatePortfolioToInsert);
route.put("/getByID/:id", portfolioController_1.getPortfolioById);
route.delete("/delete/:id", portfolioController_1.deletePortfolio);
route.put("/update/:id", portfolioController_1.updatePortfolio);
exports.default = route;
