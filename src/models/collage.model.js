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
  // this entity Show how many Students Registered in this application in Particular College
  total_APP_Rigster_Students: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Enrollment',
  },

  totalStudents: {
    type: Number, 
    require: true
  },

  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Addresses'
  },
  // this entity Show how many Faculty Registered in this application in Particular College
  APP_Rigster_Faculty: {
     type: mongoose.Schema.Types.ObjectId,
     ref:'Facultie'
  },

  TotalFaculty: {
    type: Number, 
    require: true
  },

  establishedYear: {
    type: Number,
    required: true,
  },

  ownby: {
    type: String,
    enum: ['private', 'gov'], // Limits to specific values
    required: true, // Field is mandatory
  },
  ownername:{
    type: String,
  },
  // contactDetails
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
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
