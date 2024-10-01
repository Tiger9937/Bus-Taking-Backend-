import mongoose from 'mongoose';

// Define the College schema
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const College = mongoose.model('College', collegeSchema);
