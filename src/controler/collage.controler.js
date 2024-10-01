import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import { asyncHandel } from '../utils/asyncHandaler.js'
import {College} from '../models/collage.model.js'

const CollageRigster = asyncHandel(async (req,res)=>{
    const {name} = req.body

    if (!name) {
        throw new ApiError(400,"collage name well not come");
    }

    const collage = await College.create({
        name:name
        }
    )

    if (!collage) {
        throw new ApiError(401, "Invalid collage name")
    }

    res.status(200).json(
        new Apires(200 , collage ,"collage rigster successfull")
    )
})

const collageDashboard = asyncHandel(async(res,req)=>{

})

const UpdateCollageProfile = asyncHandel(async(res,req)=>{

})


export{
    CollageRigster,
    collageDashboard,
    UpdateCollageProfile
}