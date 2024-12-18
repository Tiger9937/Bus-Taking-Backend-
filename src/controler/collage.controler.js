import { ApiError } from '../utils/ApiError.js'
import { Apires } from '../utils/Apires.js'
import { asyncHandel } from '../utils/asyncHandaler.js'
import {College} from '../models/collage.model.js'
import {Is_Image_Available} from '../middlewares/IsFileavailable.js'
import {stringTojson} from '../middlewares/TypeConvertion.js'
import {Addresses} from '../models/address.modle.js'
import {University} from '../models/University.modle.js'

// TODO:: create a Faculty information controler
// TODO:: Working in university
// TODO:: Fix the Image genration let image = await Is_Image_Available(req)
// TODO:: Make a middlewares That trnsfare data in one controler to anther controler
// 

// Separate the auth system especially for college

const Collage_singup = asyncHandel(async (res , req)=>{

}) 

const Collage_Login = asyncHandel(async (res , req)=>{

}) 


const CollageRigster = asyncHandel(async (req,res)=>{
   const {name ,establishedYear , phone , email , totalStudents , TotalFaculty , website , description , affiliatedUniversityName , coursesOffered , 
         BusName , collageAddress,ownby,ownername } = stringTojson(req)
        if (condition) {
            
        }


        if (!collageAddress) {
            throw new ApiError(400, "All fields are required to Collage Rigster");
        }

        // if (!BusName) {
        //     throw new ApiError(400, "All fields are required to Collage Rigster");
        // }
        
        if (!coursesOffered) {
            throw new ApiError(400, "All fields are required to Collage Rigster");
        }

        const Address =await Addresses.create(collageAddress)
        if (!Address) {
            throw new ApiError(401,"Address is not created")
        }
        console.log(Address)
        // getUniversityinfo = ()=>{
        //     const info = {}
                
        //     return info

        // }

        const affiliatedUniversity =await University.create({
            name:affiliatedUniversityName
        })         

        if (!affiliatedUniversity) {
            throw new ApiError(401,"affiliatedUniversity is not created")
        }
        console.log(affiliatedUniversity)
    let image = await Is_Image_Available(req.files.profile_image[0].path)


    const collage = await College.create({
        name:name, 
        Logo:image.url, 
        coverImage:image.url, 
        totalStudents, 
        TotalFaculty, 
        address:Address._id, 
        website,
        phone, 
        email, 
        description, 
        establishedYear, 
        coursesOffered,
        ownby, 
        ownername, 
        affiliatedUniversity:affiliatedUniversity._id 
        }
    )
    const AdditionalInfo =await College.aggregate([
        {
            $match:{_id:collage._id}
        },
        {
            $lookup:{
                from:"addresses",
                localField:"address",
                foreignField:"_id",
                as:"ADDRESS"
            }
        },
        { $unwind: { path: "$ADDRESS", preserveNullAndEmptyArrays: true } },
        {
            $lookup:{
                from:"universities",
                localField:"affiliatedUniversity",
                foreignField:"_id",
                as:"AFFILIATEDUNIVERSITY"
            }
        },
        { $unwind: { path: "$AFFILIATEDUNIVERSITY", preserveNullAndEmptyArrays: true } },
        {
            $project:{
                "ADDRESS":1,
                "AFFILIATEDUNIVERSITY":1
            }
        }

    ])


    const colageinfo = {...collage.toObject(),...AdditionalInfo[0]}

    if (!colageinfo) {
        throw new ApiError(401, "Invalid collage name")
    }

    res.status(200).json(
        new Apires(200 , colageinfo ,"collage rigster successfull")
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