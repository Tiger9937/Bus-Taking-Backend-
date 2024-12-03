import {Pick_Random_Image} from '../utils/Random_image_piker.js'
import {cloudinary_FUNCTION} from '../utils/cloudinary.js'

const Is_Image_Available =async (req)=>{
    // ERROR::may come when i use in actual frontend
    let image = req.files?.profile_image
     if (image) {
        return await cloudinary_FUNCTION(image[0].path)
     }else{
        return await Pick_Random_Image('user_profile_image')
     }
}

export {Is_Image_Available}