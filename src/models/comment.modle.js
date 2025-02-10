
import mongoose from 'mongoose';

const commentsSchema = new mongoose.Schema(
  {
    studentId: { // Changed to camelCase
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    collegeId: { // Changed to camelCase
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
    comment: {
      type: String,
      required: true,
      trim: true, 
      minlength: 1, 
    },
    // product 
    Project:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true } 
);

export const Comment = mongoose.model('Comment', commentsSchema);
