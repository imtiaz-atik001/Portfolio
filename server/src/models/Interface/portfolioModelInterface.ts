import mongoose,{Document} from "mongoose";

export interface IeducationSchema extends Document {
    instituteName: string;
    fieldOfStudy: string;
    duration: string;
}

export interface IexperienceSchema extends Document {
    companyLogo: string;
    companyName: string;
    designation: string;
    duration: string;
    companyAddress: string;
}



export interface IPortfolio extends Document {
    name: string;
    designation: string;
    personalAddress: {
        mapLocation: string;
        textAddress: string;
    };
    contactInfo: {
        phone: string;
        telephone: string;
    };
    emailAddresses: string[];
    educationBackground: string[];
    workingExperience: string[];
    professionalSkills: string[];
    profilePicture: string;
    sliderImages: string[];
}