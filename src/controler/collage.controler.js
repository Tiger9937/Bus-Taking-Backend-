import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import { asyncHandel } from '../utils/asyncHandaler.js'
import {College} from '../models/collage.model.js'
import {Is_Image_Available} from '../middlewares/IsFileavailable.js'

const CollageRigster = asyncHandel(async (req,res)=>{
    // TODO::handle Arrays in preparway
    // coursesOffered is giveing ass to array
    const {name ,establishedYear , phone , email , website , description , affiliatedUniversityName , coursesOffered , 
        BusName} = req.body

    if (!name) {
        throw new ApiError(400,"collage name is requred");
    }

    // create DataBase for other modles all thear functions are return modle id 
    const total_Collage_student = '' ;
    const address = '' ;
    const Faculty = '' ;
    const affiliatedUniversity = '' ;
    const bus = '';

    // concatenate in one object 
    const contactDetails = {phone , email};

    let image = await Is_Image_Available(req)

    const collage = await College.create({
        name:name,
        Loga:image.url,
        coverImage,
        totalStudents,
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

const Access_All_Collage = asyncHandel(async (req, res) => {

    const GetAllCollage = await College.find()

    res.status(200).json(
        new Apires(200 , GetAllCollage ,"access All collage successfull")
    )

});



export{
    CollageRigster,
    collageDashboard,
    UpdateCollageProfile,
    Access_All_Collage
}