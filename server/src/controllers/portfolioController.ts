import Portfolio from "../models/portfolioModel";
import { Request, Response } from "express";

interface FileFields {
    profilePicture?: Express.Multer.File[];
    sliderImages?: Express.Multer.File[];
}

type MyRequest = Request<{ id: string }, { profilePicture: string, sliderImages: string[] }, {
    name: string;
    designation: string;
    personalAddress: string;
    contactInfo: string;
    emailAddresses: string[];
    educationBackground: string[];
    workingExperience: string[];
    professionalSkills: string[];
    profilePicture: string;
    sliderImages: string[]
}>;
type MyResponse = Response<any>;

const domain = "http://localhost:4000";

export const createPortfolio = async (req: MyRequest, res: MyResponse) => {

    // const files = req.files as FileFields; // Type assertion

    // console.log(files, "files");
    // const profilePicturePath = (files.profilePicture && files.profilePicture[0].path) || '';
    // console.log(profilePicturePath)
    // const sliderImagePaths = (files.sliderImages && files.sliderImages.map(file => file.path)) || [];

    // const profilePictureUrl = `${domain}/${profilePicturePath}`;
    // console.log(profilePictureUrl)
    // const sliderImageUrls = sliderImagePaths.map(path => `${domain}/${path}`);

    const { name, designation, personalAddress, contactInfo, emailAddresses, educationBackground, workingExperience, professionalSkills, profilePicture, sliderImages } = req.body;
    
    const newPortfolio = new Portfolio({
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
        const savedPortfolio = await newPortfolio.save();
        res.status(200).json(savedPortfolio);
    } catch (err) {
        res.status(500).json(err);
    }
}

type updateType= Request<{ id: string }, {}, { name: string;
    designation: string;
    personalAddress: string;
    contactInfo: string;
    emailAddresses: string[];
    educationBackground: string[];
    workingExperience: string[];
    professionalSkills: string[]; }>;

export const updatePortfolioToInsert = async (req: updateType, res: MyResponse) => {
    
    try {
        const updatedEmail = await Portfolio.findOneAndUpdate(
            { _id: req.params.id },
            { $push: { emailAddresses: req.body.emailAddresses,
                        contactInfo: req.body.contactInfo,
                        educationBackground: req.body.educationBackground,
                        workingExperience: req.body.workingExperience,
                        professionalSkills: req.body.professionalSkills
                    }    
            },
            { new: true }
        );
        res.status(200).json(updatedEmail);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const updatePortfolio = async (req: MyRequest, res: MyResponse) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedPortfolio);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getPortfolios = async (req: MyRequest, res: MyResponse) => {
    try {
        const portfolios = await Portfolio.find();
        res.status(200).json(portfolios);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const getPortfolioById = async (req: MyRequest, res: MyResponse) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        res.status(200).json(portfolio);
    } catch (err) {
        res.status(500).json(err);
    }
}

export const deletePortfolio = async (req: MyRequest, res: MyResponse) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.status(200).json("Portfolio has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
}