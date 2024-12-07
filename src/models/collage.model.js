import mongoose from 'mongoose';

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Logo: {
    type: String, 
    required: true,
  },
  coverImage:{
    type: String, 
  },
  totalStudents: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Enrollment',
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Addresses'
  },
  Faculty: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'Facultie'
  },
  establishedYear: {
    type: Number,
    required: true,
  },
  ownby:{
    type: String,
    require: true
  },
  contactDetails: {
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  website: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  affiliatedUniversity: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'University'
  },
  coursesOffered: {
    type: [String], 
    require: true
  },
  buses: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Buse'
  }, 

},{timestamps:true});

export const College = mongoose.model('College', collegeSchema);
