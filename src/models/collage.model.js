import mongoose from 'mongoose';

// Define a Bus schema for storing bus-related data
const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    // required: true,
  },
  route: {
    type: String,
    // required: true,
  },
  driverName: {
    type: String,
    // required: true,
  },
  capacity: {
    type: Number,
    // required: true,
  },
});

// Define the College schema
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  Image: {
    type: String, // Can store the icon URL or name
    // required: true,
  },
  totalStudents: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Enrollment',
  },
  address: {
    type: String,
    // required: true,
  },
  nameFaculty: {
    type: String,
    // required: true,
  },
  totalFaculty: {
    type: Number, 
    // required: true,
  },
  establishedYear: {
    type: Number,
    // required: true,
  },
  contactDetails: {
    phone: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
  },
  website: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  affiliatedUniversity: {
    type: String, 
  },
  coursesOffered: {
    type: [String], 
  },
  buses: [busSchema], 
},{timestamps:true});

export const College = mongoose.model('College', collegeSchema);
