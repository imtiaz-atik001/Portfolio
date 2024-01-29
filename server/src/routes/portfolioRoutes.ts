import express from "express";
import upload from "../middleware/imageUploader";
import { createPortfolio, deletePortfolio, getPortfolioById, getPortfolios, updatePortfolio, updatePortfolioToInsert } from "../controllers/portfolioController";

const route = express.Router();

route.post("/create",upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'sliderImages', maxCount: 5 }]), createPortfolio);
route.get("/getAll", getPortfolios);
route.put("/updateInsert/:id", updatePortfolioToInsert);
route.put("/getByID/:id", getPortfolioById);
route.delete("/delete/:id", deletePortfolio);
route.put("/update/:id", updatePortfolio);

export default route