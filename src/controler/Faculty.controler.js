 import {asyncHandel} from '../utils/asyncHandaler.js'
 import {ApiError} from '../utils/ApiError.js'
 import {Apires} from '../utils/Apires.js'
 import {Is_Image_Available} from '../middlewares/IsFileavailable.js'



 const FacultyRigster = asyncHandel(async (res,req)=>{
    const {college, FacultyName , DOB , age  , Gender , bio , socialLinks ,
        designation , department , email , phone , address  , joiningDate , yearofstay
    } = req.body

    if ([college, FacultyName , bio , designation , department , email , phone , joiningDate ].some((field) => field?.trim() === "")) {
        throw new ApiError("All fields Are required")
    }

    if (!address) {
        throw new ApiError("All fields Are required")
    }

    if (!socialLinks) {
        throw new ApiError("All fields Are required")
    }

    if(!joiningDate && !yearofstay && !DOB && !age  && !Gender){
        throw new ApiError("All fields Are required")
    }



 })

 const FacultyProfile = asyncHandel(async (res,req)=>{

 })

 const UpdateFacultyProfile = asyncHandel(async (res,req)=>{

 })

 export {FacultyRigster , FacultyProfile , UpdateFacultyProfile}

