
import mongoose from 'mongoose';

const socialLinks = new mongoose.Schema({
    StudentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Student'
    },
    CollegeId:{
      type : mongoose.Schema.Types.ObjectId,
      ref:"College"
    },
    links:[{
      platform_Img: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
    }
    ]
    
})

export const socialMedias = mongoose.model('socialMedias', socialLinks)

