import {asyncHandel} from '../utils/asyncHandaler.js'
import {Student} from '../models/student.modle.js'
import {College} from '../models/collage.model.js'

import { ApiError } from '../utils/ApiError.js';

const studentRegister = asyncHandel(async(req , res)=>{
    // GET besice info
    // send data of the basice user 
    // give him the user Home address
    // give him the living currend address
    // Phon number

    const { Living_address,
        address,
        mobileNumber,
        collage ,
        enrollmentDate,
        course,
        RollNumber
    } = req.body
    if ([ RollNumber,address,mobileNumber,Living_address,collage,enrollmentDate,course ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required to Register the student");
    }
    // TODO get console.log(address)
    const Collage = await College.findById(collage)
    if (!Collage) {
        throw new ApiError("collage id is invalid")
    }
    const student = await Student.create({
        user:req.user?._id,
        address: {
            street: address.street || "No street",       
            Village: address.Village || "No village",
            city: address.city || "No city",
            state: address.state || "No state",
            postalCode: address.postalCode || "No postalCode"
        },  
        current_living_address: {
            street: Living_address.street || "No street",       
            Village: Living_address.Village || "No village",
            city: Living_address.city || "No city",
            state: Living_address.state|| "No state",
            postalCode: Living_address.postalCode || "No postalCode"
        },  
        phoneNumber:mobileNumber,
        enrollmentDate,
        course,
        RollNumber,
        college: Collage._id
    });

   
    // use aggregator to customize request
    if (!student) {
        throw new ApiError(401,"Student Well not creat ")
    }

    res.status(200).json(
        200,
        {student},"Student Rigster successFull"
    )

})  

const StudentProfile = asyncHandel(async(req,res)=>{
    const {studentname} = req.params
    if(!studentname){
        throw new ApiError(400,"student name is requred")
    }
    
    const student = await Student.findOne({user:req.user?._id}).populate('user')
    if (student.user.fullname != studentname) {
        throw new ApiError(401,"invalid student name")
    }


    await Student.aggregate([
        {
            $match:{

            }
        }
    ])



})
export{
    StudentProfile,
    studentRegister,
}