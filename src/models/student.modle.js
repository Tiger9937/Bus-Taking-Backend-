import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema(
  {
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },



  enrollment: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'Enrollment',
    required : true
  },
  
  address:{
   type : mongoose.Schema.Types.ObjectId,
   ref: "Addresses",
   required : true
  },
  current_living_address:{
   type : mongoose.Schema.Types.ObjectId,
   ref: "Addresses",
   required: true
  },
  course: {
    type: String, 
    required: true,
  },
  RollNumber:{
    type:String,
    required: true,
  },
  mobileNumber:{
    type:Number,
    required: true,
  },
  DOB:{
    type:String,
    required: true,
  },
  age:{
    type:Number,
    required: true,
  },
  projects:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  Research_Paper:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Research_Paper',
  },
  ProjectIdeas:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProjectIdeas',
  },
  Nots:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nots',
  },
  BusInfo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusInfo',
  },
  PublicInfo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  socialLinks :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'socialMedias',
  }
},{timestamps:true});
export const Student = mongoose.model('Student', studentSchema)