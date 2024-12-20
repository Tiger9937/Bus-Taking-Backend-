import mongoose from 'mongoose';

const FacultySchema = new mongoose.Schema(
  {
    college: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true, 
    },
    FacultyName: {
      type: String,
      required: true, 
      trim: true, 
    },
    DOB:{
        type: Date,
        required: true,
    },
    age:{
        type: Number,
        required: true, 
    },
    Gender:{
        type:String,
        require:true
    },
    Image: {
      type: String, 
      require: true
    },
    bio: {
      type: String,
    },
    socialLinks: {
      type: [String], 
    },
    designation: {
      type: String,
      enum: ['Professor', 'Assistant Professor', 'Lecturer', 'Dean', 'Other'],
      default: 'Lecturer',
    },
    department: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    enrollmentDate: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Enrollment',
      required : true
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Addresses',
    },
    joiningDate: {
      type: Date,
      default: Date.now,
      
    },
    yearofstay:{
        type:Number,
        default: 0
    }
  },
  { timestamps: true }
);

const Faculty = mongoose.model('Faculty', FacultySchema);

export{Faculty}
