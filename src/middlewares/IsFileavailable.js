import {Pick_Random_Image} from '../utils/Random_image_piker.js'
import {cloudinary_FUNCTION} from '../utils/cloudinary.js'

const Is_Image_Available =async (path)=>{

     if (path) {
        return await cloudinary_FUNCTION(path)
     }else{
        return await Pick_Random_Image('user_profile_image')
     }
     
}

export {Is_Image_Available}