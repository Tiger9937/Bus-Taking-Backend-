import {socialMedias} from "../models/socialmidia.modle.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandel } from "../utils/asyncHandaler.js";
import { Apires } from "../utils/Apires.js";


const CreateMidia = asyncHandel(async (req, res) => {
   
    const { SocialLink, Appimage } = req.body;

    if (!SocialLink && !Appimage) {
        throw new ApiError(400, "All fields are required.");
    }
    
    const social_Data = await socialMedias.create({
        platform_Img:Appimage,
        url:SocialLink
    });

    if (!social_Data) {
        throw new ApiError(400,"Midia is not created")
    }

    res.status(200).json(new Apires(200, social_Data, "Media created successfully"));
});

const removiedMidia = asyncHandel(async (req,res)=>{
    const {midiaId} = req.body

    if (!midiaId) {
        throw new ApiError(405,"midiaid is not coming")
    }

    socialMedias.findByIdAndDelete(midiaId)

    res.status(200).json({ message: `Delete midia id successfull`} )

})

const AccessMidia = asyncHandel(async (req,res)=>{
    const {midiaId} = req.params

    if (!midiaId) {
        throw new ApiError(405,"midiaid is not coming")
    }

    const socialmidia = socialMedias.findById(midiaId)

    if (!socialmidia) {
        throw new ApiError(405,"midiaid is not coming")
    }

    res.status(200).json(new Apires(200, socialmidia ,"access media successful"))

})

export{CreateMidia , removiedMidia , AccessMidia}