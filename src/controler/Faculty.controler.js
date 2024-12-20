 import {asyncHandel} from '../utils/asyncHandaler.js'
 import {ApiError} from '../utils/ApiError.js'
 import {Apires} from '../utils/Apires.js'
 import {Is_Image_Available} from '../middlewares/IsFileavailable.js'
 import {Faculty} from '../models/Faculty.modle.js'
 import {Addresses} from '../models/address.modle.js'
 import { Enrollment } from '../models/enrollment.modle.js'
 import {stringTojson} from '../middlewares/TypeConvertion.js'


 const FacultyRigster = asyncHandel(async (req,res)=>{


    const {college, FacultyName , DOB , age  , Gender , bio , socialLinks, designation , department , email , phone , Facultaddress  , joiningDate , yearofstay } = stringTojson(req)

    if ([college, FacultyName , bio , designation , department , email].some((field) => field?.trim() === "")) {
        throw new ApiError(400,"All fields Are required")
    } 
    
    if (!Facultaddress) {
        throw new ApiError(400,"All fields Are required")
    }   



    if (!socialLinks) {
        throw new ApiError(400,"All fields Are required")
    }

    if(!joiningDate && !yearofstay && !DOB && !age  && !Gender && !phone){
        throw new ApiError("All fields Are required")
    }
    
    
    const Facultyaddress = await Addresses.create(Facultaddress)
    
    

    if (!req.files.profile_image[0].path) {
        throw new ApiError(402,"profile is not comming")
    }

    const image = await Is_Image_Available(req.files.profile_image[0].path)

    // console.log("Break point")
    const FacultyInrollmentDate = await Enrollment.create({
        EnrollmentDate:joiningDate,
        college:college
    })
    const collageFaculty =await Faculty.create({
        college:college,
        FacultyName,
        DOB,
        age,
        Gender,
        Image:image.url,
        bio,
        socialLinks,
        designation,
        department,
        email,
        phone,
        enrollmentDate:FacultyInrollmentDate._id,
        address:Facultyaddress._id,
        joiningDate,
        yearofstay
    })

    const AdditionalInfo =await Faculty.aggregate([
        {
            $match:{ _id:collageFaculty._id }
        },
        {
            $lookup:{
                localField:"address",
                from:"addresses",
                foreignField:"_id",
                as:"ADDRESS",

            }
        },
        { $unwind: { path: "$ADDRESS", preserveNullAndEmptyArrays: true } },
        {
            $project:{  
                "ADDRESS":1
            }
        }
    ])

    const FacultyInfo = {...collageFaculty.toObject() , ...AdditionalInfo[0]}

    
    return res.status(200).json(
        new Apires(200 , FacultyInfo , "college Faculty Register Successfully")
    )



 })

 const FacultyProfile = asyncHandel(async (req,res)=>{

 })

 const UpdateFacultyProfile = asyncHandel(async (res,req)=>{

 })

 export {FacultyRigster , FacultyProfile , UpdateFacultyProfile}

