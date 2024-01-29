import mongoose from "mongoose";
import {IPortfolio, IeducationSchema, IexperienceSchema} from "./Interface/portfolioModelInterface";

// Schema for Education Background
const educationSchema = new mongoose.Schema< IeducationSchema >({
    instituteName: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    duration: { type: String, required: true }
});

// Schema for Working Experience
const experienceSchema = new mongoose.Schema< IexperienceSchema >({
    companyLogo: { type: String }, // Store URL or image file path
    companyName: { type: String, required: true },
    designation: { type: String, required: true },
    duration: { type: String, required: true },
    companyAddress: { type: String } // Text address
});

// Main Schema for Personal Portfolio
const portfolioSchema = new mongoose.Schema< IPortfolio >({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    personalAddress: {
        mapLocation: { type: String, required: true }, // Google Map location string/HTML
        textAddress: { type: String, required: true }
    },
    contactInfo: {
        phone: { type: String },
        telephone: { type: String }
    },
    emailAddresses: [{ type: String }],
    educationBackground: [educationSchema],
    workingExperience: [experienceSchema],
    professionalSkills: [{ type: String }],
    profilePicture: { type: String }, // URL or file path for profile picture
    sliderImages: [{ type: String }] // Array of URLs or file paths for slider images
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;
