"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePortfolio = exports.getPortfolioById = exports.getPortfolios = exports.updatePortfolio = exports.updatePortfolioToInsert = exports.createPortfolio = void 0;
const portfolioModel_1 = __importDefault(require("../models/portfolioModel"));
const domain = "http://localhost:4000";
const createPortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const files = req.files as FileFields; // Type assertion
    // console.log(files, "files");
    // const profilePicturePath = (files.profilePicture && files.profilePicture[0].path) || '';
    // console.log(profilePicturePath)
    // const sliderImagePaths = (files.sliderImages && files.sliderImages.map(file => file.path)) || [];
    // const profilePictureUrl = `${domain}/${profilePicturePath}`;
    // console.log(profilePictureUrl)
    // const sliderImageUrls = sliderImagePaths.map(path => `${domain}/${path}`);
    const { name, designation, personalAddress, contactInfo, emailAddresses, educationBackground, workingExperience, professionalSkills, profilePicture, sliderImages } = req.body;
    const newPortfolio = new portfolioModel_1.default({
        name,
        designation,
        personalAddress,
        contactInfo,
        emailAddresses,
        educationBackground,
        workingExperience,
        professionalSkills,
        profilePicture,
        sliderImages
    });
    try {
        const savedPortfolio = yield newPortfolio.save();
        res.status(200).json(savedPortfolio);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.createPortfolio = createPortfolio;
const updatePortfolioToInsert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedEmail = yield portfolioModel_1.default.findOneAndUpdate({ _id: req.params.id }, { $push: { emailAddresses: req.body.emailAddresses,
                contactInfo: req.body.contactInfo,
                educationBackground: req.body.educationBackground,
                workingExperience: req.body.workingExperience,
                professionalSkills: req.body.professionalSkills
            }
        }, { new: true });
        res.status(200).json(updatedEmail);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updatePortfolioToInsert = updatePortfolioToInsert;
const updatePortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedPortfolio = yield portfolioModel_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedPortfolio);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.updatePortfolio = updatePortfolio;
const getPortfolios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolios = yield portfolioModel_1.default.find();
        res.status(200).json(portfolios);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getPortfolios = getPortfolios;
const getPortfolioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolio = yield portfolioModel_1.default.findById(req.params.id);
        res.status(200).json(portfolio);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.getPortfolioById = getPortfolioById;
const deletePortfolio = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield portfolioModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Portfolio has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.deletePortfolio = deletePortfolio;
