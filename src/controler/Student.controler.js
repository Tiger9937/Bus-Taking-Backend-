import {asyncHandel} from '../utils/asyncHandaler.js'
import {Student} from '../models/student.modle.js'
import {College} from '../models/collage.model.js'
import { ApiError } from '../utils/ApiError.js';
import mongo  from 'mongoose';
import { Apires } from '../utils/Apires.js';
import {Addresses} from '../models/address.modle.js'
import mongoose from 'mongoose';

// improve this student controler
// make that fronend ui




const studentRegister = asyncHandel(async (req, res) => {
    const {
        mobileNumber,
        Collage,
        course,
        RollNumber,
        Address,
        Living_address
    } = req.body;

    
    if ([mobileNumber, Collage, course, RollNumber].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required to register as a student");
    }

    if (!Address) {
        throw new ApiError(401, "Address is required to register as a student");
    }

    if (!Living_address) {
        throw new ApiError(401, "Living Address is required to register as a student");
    }

    
    const studentAddress = await Addresses.create(Address);
    const student_Living_address = await Addresses.create(Living_address);

   
    const student = await Student.create({
        user: req.user._id,
        mobileNumber,
        college: Collage,
        course,
        RollNumber,
        address: studentAddress._id,
        current_living_address: student_Living_address._id
    });
   // await student.populate(['user','address', 'current_living_address','college']);
    // agrigation pip line 

   const stINFO = await Student.aggregate([
      {
        $match :{_id: student._id}
      },
      {
        $lookup :{
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "USER",
        }
      },
      {
        $lookup: {
            from: "addresses",
            localField: "address",
            foreignField: "_id",
            as: "ADDRESS",
        }
      },
      {
        $lookup:{
            from: "colleges",
            localField:"college",
            foreignField:"_id",
            as:"COLLAGE"
        }
      },
      {
        $lookup:{
            from: "addresses",
            localField : "current_living_address",
            foreignField: "_id",
            as: "LIVING_ADDRESS"
        }
      },
      {
        $project: {
            "USER.fullname": 1,
            
            "ADDRESS.countrie": 1, 
            "ADDRESS.state": 1, 
            "ADDRESS.District": 1, 
            "ADDRESS.at": 1, 
            "ADDRESS.po": 1, 
            "ADDRESS.Village": 1, 
            "ADDRESS.city": 1, 
            "ADDRESS.pincode": 1, 
            "ADDRESS.Nearer_Landmark": 1, 

            "LIVING_ADDRESS.countrie": 1, 
            "LIVING_ADDRESS.state": 1, 
            "LIVING_ADDRESS.District": 1, 
            "LIVING_ADDRESS.at": 1, 
            "LIVING_ADDRESS.po": 1, 
            "LIVING_ADDRESS.Village": 1, 
            "LIVING_ADDRESS.city": 1, 
            "LIVING_ADDRESS.pincode": 1, 
            "LIVING_ADDRESS.Nearer_Landmark": 1, 
            
            "COLLAGE": 1,
        }
    }
    ]);

    
    console.log(stINFO[0])


    
    return res.status(200).json(new Apires(200, student, "Student registered successfully"));
});


const StudentProfile = asyncHandel(async(req,res)=>{

  const {fullname} = req.body
  
  // find the student thought the username 
  // papulat student->fullname _id 
  //        call the user modle to get user id
  //        
  // agregation 

    


    res.status(200).json( new Apires(201 , student ,"student data send successfull") )
})

const UpdateStudentProfile = asyncHandel(async(req,res)=>{
   
})


export{
    StudentProfile,
    studentRegister,
    UpdateStudentProfile   
} 
