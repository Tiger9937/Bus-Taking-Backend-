import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  // student: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Student', 
  //   required: true,
  // },
  // college: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'College', 
  //   required: true,
  // },
  EnrollmentDate:{
    type: Date,
    require: true
  }
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
