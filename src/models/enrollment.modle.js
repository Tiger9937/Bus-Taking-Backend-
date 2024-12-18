import mongoose from 'mongoose';


const enrollmentSchema = new mongoose.Schema({
  APP_Rigster_Faculty: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'Facultie'
  },
  EnrollmentDate:{
    type: Date,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
  },
  college: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'College', 
    
  },
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
