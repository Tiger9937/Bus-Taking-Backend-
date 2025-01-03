import {socialMedias} from "../models/socialmidia.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandel } from "../utils/asyncHandaler.js";
import {Student} from '../models/student.modle.js'
import { Apires } from "../utils/Apires.js";
import { json } from "express";
import mongoose from "mongoose";
import {jsonfiles_In_temp , Delete_jsonfiles_In_temp} from '../middlewares/createJsonfile.js'

const CreateMidia = asyncHandel(async(req,res)=>{
    console.log("Break point")
    const {Student_OR_College_Id,SocialLinks,Appimage} = req.body    

    if (!Student_OR_College_Id &&!SocialLinks &&!Appimage) {
        throw new ApiError("All filds are Requred")
    }

    const Does_StudentExist  = await Student.exists({_id:Student_OR_College_Id})

    await socialMedias.create({
            [Does_StudentExist ? "StudentId" : "CollegeId"]:Student_OR_College_Id,
            links:SocialLinks.map((linkes,index)=>({
                    platform_Img:Appimage[index],
                    url:linkes
            }))
    })

    res.status(200).json({message:"Media Add Successfully"})
})

const AccessAllMidia = asyncHandel(async(req,res)=>{
    const {MidialId} = req.query
    if (!MidialId) {
        throw new ApiError("Id is Requred to access all social info")
    }
   
    const Allmidia = await socialMedias.findById(MidialId)
    // throw new ApiError(250 , "Stop For Du To the debuging")


    
    if (!Allmidia) {
        throw new ApiError("Id is not valid")
    }

    res.status(200).json(new Apires(200,Allmidia ,"All midia Send Successfull"))
})

const RemovedAllMidia = asyncHandel(async(req,res)=>{
    const {MidialId} = req.params


    if (!MidialId) {
        throw new ApiError(400,"Id is Requred to access all social info")
    }

    await socialMedias.findByIdAndDelete(MidialId)

    res.status(200).json({message:"Media is delete Successfully"})
})

// TODO::Fix the bug
const RemovedSelectedMidias = asyncHandel(async (req, res) => {
    const { MidialId, linkes } = req.body;

    /*
        Example input:
        id: "hcyfbhc856674cbfr"
        linkes: ["https://platform1.com", "https://platform2.com"]
    */

    
    if (!MidialId || !linkes || !Array.isArray(linkes) || linkes.length === 0) {
        throw new ApiError(400, "MidialId and linkes are required, and linkes must be a non-empty array.");
    }

    
    const midiisexist = await socialMedias.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(MidialId) } }
    ]);

    if (midiisexist.length === 0) {
        throw new ApiError(404, "Social media entry not found.");
    }

    
    const All_DataBase_social_Linkes = (await jsonfiles_In_temp(midiisexist[0])).links;

    
    const Dose_all_links_true = All_DataBase_social_Linkes
        .map((data) => data.url)
        .filter((dbUrl) => linkes.includes(dbUrl));

    if (Dose_all_links_true.length === 0) {
        await Delete_jsonfiles_In_temp()
        throw new ApiError(404, "None of the provided links exist in the database.");
    }
    await socialMedias.updateOne(
            { _id: MidialId },
                { $pull: { links: { url: {$in:Dose_all_links_true} } } }
    );
       
    await Delete_jsonfiles_In_temp()

    res.status(200).json({message: "Your social media links were successfully removed."});
});

// TODO::Fix the bug
const AddMidia = asyncHandel(async(req , res)=>{
    const {MidialId , SocialLinks,Appimage} = req.body

    if ( !MidialId && !Array.isArray(SocialLinks) && !Array.isArray(Appimage) ) {
        throw new ApiError(400,"all filds are requred")
    }

    const midiaupdate = await socialMedias.findByIdAndUpdate({_id:MidialId},{
        $push:{
            links:SocialLinks.map((link,index)=>({
                url:link,
                platform_Img:Appimage[index]
            }))
        }
    })

    if (!midiaupdate) {
        throw new ApiError(404, "Social Media document not found");
    }

    res.status(200).json(new Apires(200,midiaupdate,"new social midias add successfull"))
})

const AccessAllMidiafottest = asyncHandel(async(req,res)=>{
    const {MidialId} = req.query
    if (!MidialId) {
        throw new ApiError(500,"Id is Requred to access all social info")
    }
   
    const Allmidia = await socialMedias.findById(MidialId)
    // throw new ApiError(250 , "Stop For Du To the debuging")


    
    if (!Allmidia) {
        throw new ApiError(500,"Id is not valid")
    }

    res.status(200).json(new Apires(200,Allmidia ,"All midia Send Successfull"))
})

export{CreateMidia ,
    AccessAllMidia , RemovedAllMidia , RemovedSelectedMidias , AddMidia , AccessAllMidiafottest}