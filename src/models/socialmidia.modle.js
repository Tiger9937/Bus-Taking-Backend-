
import {schema, model} from 'mongoose';

const socialLinks = new schema({
    platformimg: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
})
const socialMedias = model('socialMedias', socialLinks)
export default socialMedias;