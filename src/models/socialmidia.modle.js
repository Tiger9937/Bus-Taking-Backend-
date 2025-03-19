
import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema({
   
      platform_Img: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      }
})

export const socialMedias = mongoose.model('socialMedias', socialLinkSchema)

