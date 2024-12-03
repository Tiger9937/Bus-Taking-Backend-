import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import { asyncHandel } from '../utils/asyncHandaler.js'
import {College} from '../models/collage.model.js'
import {Is_Image_Available} from '../middlewares/IsFileavailable.js'

const CollageRigster = asyncHandel(async (req,res)=>{
    const {name} = req.body
    let image

    
    if (!name) {
        throw new ApiError(400,"collage name is requred");
    }

    image = await Is_Image_Available(req)


    const collage = await College.create({
        name:name,
        Image:image.url
        }
    )
    console.log(collage)

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

const Access_All_Collage = asyncHandel(async (req, res) => {

    const GetAllCollage = await College.find()

    
    const collegesObj = GetAllCollage.reduce((acc, college) => {
        acc[college._id] = college;
        return acc;
    }, {});

    res.status(200).json(
        new Apires(200 , collegesObj ,"access All collage successfull")
    )

});



export{
    CollageRigster,
    collageDashboard,
    UpdateCollageProfile,
    Access_All_Collage
}