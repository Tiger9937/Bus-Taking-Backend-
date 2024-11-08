import {asyncHandel} from '../utils/asyncHandaler.js'
import {Student} from '../models/student.modle.js'
import { ApiError } from '../utils/ApiError.js';
import { Apires } from '../utils/Apires.js';
import {Addresses} from '../models/address.modle.js'
import mongoose from 'mongoose';




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
  

   const AdditionalInfo = await Student.aggregate([
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
      { $unwind: { path: "$USER", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
            from: "addresses",
            localField: "address",
            foreignField: "_id",
            as: "ADDRESS",
        }
      },
      { $unwind: { path: "$ADDRESS", preserveNullAndEmptyArrays: true } },
      {
        $lookup:{
            from: "colleges",
            localField:"college",
            foreignField:"_id",
            as:"COLLAGE"
        }
      },
      { $unwind: { path: "$COLLAGE", preserveNullAndEmptyArrays: true } },
      {
        $lookup:{
            from: "addresses",
            localField : "current_living_address",
            foreignField: "_id",
            as: "LIVING_ADDRESS"
        }
      },
      { $unwind: {path: "$LIVING_ADDRESS" , preserveNullAndEmptyArrays: true}},
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

   

    const studentinfo =  {...student.toObject() , ...AdditionalInfo[0]}
    // delete this data's for overcome sending unused data 
    delete studentinfo.user;
    delete studentinfo.college;
    delete studentinfo.address;
    delete studentinfo.current_living_address;

    
    return res.status(200).json(new Apires(200, studentinfo, "Student registered successfully"));
});

const StudentProfile = asyncHandel(async (req, res) => {

  const { _ID , username , fullname} = req.params; 

  
  if (!_ID && !username && !fullname) {
    throw new ApiError(401, "Invalid request or User error Give the valid request[US:ERROR]");
}

  const AccessstudentId = await Student.aggregate([
    {
      $lookup:{
        from:"users",
        localField:"user",
        foreignField:"_id",
        as:"USER"
      }
    },
    {$unwind : "$USER"},
    {
      $match:{
        $or:[{"USER.usename" : username} , {"USER.fullname" : fullname}]
      }
    },
    {
      $project:{
        _id:1
      }
    }

  ])  

  const id = _ID || AccessstudentId[0]._id;

  const student = await Student.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) }
    },
    {
      $lookup:{
        from:"users",
        localField:"user",
        foreignField:"_id",
        as:"USER"
      }
    },
    {$unwind : {path:"$USER" , preserveNullAndEmptyArrays:true}},



    {
      $lookup:{
        from:"colleges",
        localField:"college",
        foreignField:"_id",
        as:"COLLAGE",
      }
    },
    {$unwind: {path:"$COLLAGE" , preserveNullAndEmptyArrays:true}},


    {
      $lookup:{
        from:"addresses",
        localField:"address",
        foreignField:"_id",
        as:"ADDRESS"
      }
      
    },
    {$unwind: {path:"$ADDRESS" , preserveNullAndEmptyArrays:true}},
    {
      $lookup:{
        from:"addresses",
        localField:"current_living_address",
        foreignField:"_id",
        as:"LIVING_ADDRESS"
      }
    },
    {$unwind : {path:"$LIVING_ADDRESS" , preserveNullAndEmptyArrays:true}},
    {
      $project:{
        
        "USER.usename" :1,
        "USER.email" : 1,
        "USER.fullname":1,

        "COLLAGE":1,

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
      }
    }
  ])

  
  if (!student) {
    throw new ApiError(400,"student well not fount at data base [DB:ERROR]")
  }

  return res.status(200).json(new Apires(200, student[0], "Student data retrieved successfully"));
});



const UpdateStudentProfile = asyncHandel(async(req,res)=>{
 
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
  throw new ApiError(400, "Address is required to register as a student");
}

if (!Living_address) {
  throw new ApiError(400, "Living Address is required to register as a student");
}


const ForStudentupdateIDS = await Student.aggregate([
  {
      $lookup:{
        from:"users",
        localField:"user",
        foreignField:"_id",
        as:"USER"
      }
  },
  {$unwind : "$USER"},
  {
    $match:{"USER._id" : req.user?._id}
  },
  {
    $lookup:{
      from:"addresses",
      localField:"address",
      foreignField:"_id",
      as:"ADDRESS"
    }
  },
  {
    $lookup:{
      from:"addresses",
      localField:"current_living_address",
      foreignField:"_id",
      as:"LIVING_ADDRESS"
    }
  },
  {
    $project:{
        _id:1,
        "ADDRESS":"$ADDRESS._id",
        "LIVING_ADDRESS":"$LIVING_ADDRESS._id" 
    }
  }
])

if (ForStudentupdateIDS.length === 0) {
  throw new ApiError(404, "Student not found"); 
}

let  StudentID = ForStudentupdateIDS[0]._id
let StudentLIVING_ADDRESSID = ForStudentupdateIDS[0].ADDRESS[0]
let  StudentAddressID = ForStudentupdateIDS[0].LIVING_ADDRESS[0]



await Addresses.findByIdAndUpdate(StudentAddressID , {
  $set:{
    ...Address
  }
})

await Addresses.findByIdAndUpdate(StudentLIVING_ADDRESSID , {
  $set:{
    ...Living_address
  }
})

await Student.findByIdAndUpdate(StudentID , {
  $set:{
        user: req.user?._id,
        mobileNumber,
        college: Collage,
        course,
        RollNumber,
        address: StudentAddressID,
        current_living_address: StudentLIVING_ADDRESSID
  }
})

const student = await Student.aggregate([
  {
    $match: { _id: new mongoose.Types.ObjectId(StudentID) }
  },
  {
    $lookup:{
      from:"users",
      localField:"user",
      foreignField:"_id",
      as:"USER"
    }
  },
  {$unwind : {path:"$USER" , preserveNullAndEmptyArrays:true}},



  {
    $lookup:{
      from:"colleges",
      localField:"college",
      foreignField:"_id",
      as:"COLLAGE",
    }
  },
  {$unwind: {path:"$COLLAGE" , preserveNullAndEmptyArrays:true}},


  {
    $lookup:{
      from:"addresses",
      localField:"address",
      foreignField:"_id",
      as:"ADDRESS"
    }
    
  },
  {$unwind: {path:"$ADDRESS" , preserveNullAndEmptyArrays:true}},
  {
    $lookup:{
      from:"addresses",
      localField:"current_living_address",
      foreignField:"_id",
      as:"LIVING_ADDRESS"
    }
  },
  {$unwind : {path:"$LIVING_ADDRESS" , preserveNullAndEmptyArrays:true}},
  {
    $project:{
      
      "USER.usename" :1,
      "USER.email" : 1,
      "USER.fullname":1,

      "COLLAGE":1,

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
    }
  }
])



  if (!student) {
    throw new ApiError(404, "Student update failed, student not found"); // Handle update failure
  }

res.status(200).json(new Apires(200 , student ,"Student successfully updated"))

})  


export{
    StudentProfile,
    studentRegister,
    UpdateStudentProfile   
} 
