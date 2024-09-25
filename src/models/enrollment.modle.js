import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student', 
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
  course: {
    type: String, 
    required: true,
  },
  status: {
    type: String, 
    default: 'active',
  },
});

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
