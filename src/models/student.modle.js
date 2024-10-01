import mongoose from 'mongoose';


const studentSchema = new mongoose.Schema(
  {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  },
  address:{
    street: {
      type : String,
      require:true
    },
    city: {
      type:String
    },
    village:{
      type : String
    },
    state: {
      type : String,
      require:true
    },
    pincode: {
      type: Number,
      require:true
    },
  },
  current_living_address:{
    street: {
      type : String,
      require:true
    },
    city: {
      type:String
    },
    village:{
      type : String
    },
    state: {
      type : String,
      require:true
    },
    pincode: {
      type: Number,
      require:true
    },
  },
  enrollmentDate: {
    type: Date,
    default: Date.now, 
  },
  course: {
    type: String, 
    required: true,
  },
  RollNumber:{
    type:String,
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