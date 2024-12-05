import mongoose from 'mongoose';


const enrollmentSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  EnrollmentDate:{
    type: Date,
    require: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College', 
    required: true,
  },
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
