import mongoose from 'mongoose';
const sudent_address = new mongoose.Schema({
  street: {
    type:String
  },
  Village:{
    type:String
  },
  city:{
     String
  },
  state: {
    String
  },
  postalCode: {
    String
  },
})

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  address: sudent_address,
  rollNumber:{
    type: Number,
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
});
export const Student = mongoose.model('Student', studentSchema)