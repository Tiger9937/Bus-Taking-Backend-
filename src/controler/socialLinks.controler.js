import {socialMedias} from "../models/socialmidia.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandel } from "../utils/asyncHandaler.js";
import {Student} from '../models/student.modle.js'
import { Apires } from "../utils/Apires.js";


const CreateMidia = asyncHandel(async(req,res)=>{
    console.log("Break point")
    const {Id,SocialLinks,Appimage} = req.body    

    if (!Id &&!SocialLinks &&!Appimage) {
        throw new ApiError("All filds are Requred")
    }

    const Does_StudentExist  = await Student.exists({_id:Id})

    await socialMedias.create({
            [Does_StudentExist ? "StudentId" : "CollegeId"]:Id,
            links:SocialLinks.map((linkes,index)=>({
                    platform_Img:Appimage[index],
                    url:linkes
            }))
    })

    res.status(200).json({message:"Media Add Successfully"})
})

const AccessAllMidia = asyncHandel(async()=>{
    const {MidialId} = req.params
    if (!MidialId) {
        throw new ApiError("Id is Requred to access all social info")
    }
    const Allmidia = await socialMedias.findById(Id)

    res.status(200).json(new Apires(200,Allmidia ,"All midia Send Successfull"))
})

const RemovedAllMidia = asyncHandel(async(req,res)=>{
    const {MidialId} = req.params
    if (!MidialId) {
        throw new ApiError("Id is Requred to access all social info")
    }

    await socialMedias.findByIdAndDelete(MidialId)

    res.status(200).json({message:"Media is delete Successfully"})
})

const RemovedSelectedMidias = asyncHandel(async(req,res)=>{
    const {MidialId,linkes} = req.params
    /*
        id:"hcyfbhc856674cbfr"
        linkes:["https://platform1.com", "https://platform2.com"]
   */
    if (!MidialId && !linkes) {
        throw new ApiError("all filds are requred")
    }

    for (const uri of linkes) {
        await socialMedias.updateOne(
            {_id:MidialId},
            {
                $pull:{links:{url:uri}}
            }
        )
    }
    
    res.status(200).json({message:"Your social medias well Successfully Removed"})
})

const AddMidia = asyncHandel(async(req , res)=>{
    const {MidialId , SocialLinks,Appimage} = req.params

    if ( !MidialId && !Array.isArray(SocialLinks) && !Array.isArray(Appimage) ) {
        throw new ApiError(400,"all filds are requred")
    }

    const midiaupdate = await socialMedias.findByIdAndUpdate({_id:MidialId},{

        links:SocialLinks.map((link,index)=>({
            url:link,
            platform_Img:Appimage[index]
        }))
    })

    if (!midiaupdate) {
        throw new ApiError(404, "Social Media document not found");
    }

    res.status(200).json({message:"new social midias add successfull"})
})

export{CreateMidia ,
    AccessAllMidia , RemovedAllMidia , RemovedSelectedMidias , AddMidia}