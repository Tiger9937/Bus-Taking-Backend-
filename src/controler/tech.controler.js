import { asyncHandel } from "../utils/asyncHandaler.js";
import {techmaker} from '../system/techstackmaker.system.js'
import { ApiError } from "../utils/ApiError.js";
import { Apires } from "../utils/Apires.js";
import {technology} from '../models/technologyinfo.modle.js'

const createtech = asyncHandel(async(req,res)=>{
    const {imgurl, domain, name} = req.body
    
    if (!imgurl && domain && name) {
        throw new ApiError(404,"All filds are requred")
    }

    const tech = await techmaker(imgurl,domain,name)

    
    if (!tech) {
        throw new ApiError(400,"tech is not created")
    }

    res.status(200).json(new Apires(200 , tech , "tech create successful" ))

})


const AccessTech = asyncHandel(async(req,res)=>{
    const {techid} = req.params
    
        if (!techid) {
            throw new ApiError(405,"technology is not coming")
        }
    
        const technology = technology.findById(techid)
    
        if (!technology) {
            throw new ApiError(405,"technology is not coming")
        }
    
        res.status(200).json(new Apires(200, technology ,"access media successful"))
})


const removedTech = asyncHandel(async (req,res)=>{
    const {techId} = req.body
    
        if (!techId) {
            throw new ApiError(405,"techId is not coming")
        }
    
        technology.findByIdAndDelete(techId)
    
        res.status(200).json({ message: `Delete tech successfull`} )
    
})

export{createtech , AccessTech , removedTech}